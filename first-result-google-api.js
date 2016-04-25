/**
 * Created by prosolvo on 4/19/16.
 */

var request = require('google-oauth-jwt').requestWithJWT();
var exports = module.exports = {};
var numberResponses = 1;

// check in the database query,
// if you have an outstanding response from the database,
// otherwise, we use the Google api
exports.getFirstResultGoogleAPI = function(options, callback){
    if (!options) throw new Error('options is required');
    if (!options.email) throw new Error('options.email is required');
    if (!options.cx) throw new Error('options.cx is required');
    if (!options.keyFile) throw new Error('options.keyFile is required');
    if (!options.yourQuery) throw new Error('options.yourQuery is required');

    //check your query in the database, if there is a conclusion from the database
    // else send a request to the Google api
    connection.query('SELECT SQL_CACHE * FROM res_google_api WHERE query=? LIMIT 1', [options.yourQuery], function(err, result) {
        if(err) throw err;
        if(result.length){
            var object = {link: result[0].first_result_url};
            callback(object);
        }
        else {
            request({
                url: 'https://www.googleapis.com/customsearch/v1?q='+options.yourQuery+'&cx='+options.cx+'&num='+numberResponses,
                jwt: {
                    email: options.email,
                    keyFile: options.keyFile,
                    scopes: ['https://www.googleapis.com/auth/cse']
                }
            }, function (err, res, body) {

                var data = JSON.parse(body);
                var firstResultUrl = JSON.stringify(data.items[0].formattedUrl);
                var googleAPI  = {query: options.yourQuery, first_result_url: firstResultUrl};

                connection.query('INSERT INTO res_google_api SET ?', googleAPI, function(err, result) {
                    if(err) throw err;
                });
                connection.end();
                callback(data.items[0]);
            });
        }
    });
};
