/**
 * Created by prosolvo on 4/19/16.
 */
var mysql = require('mysql');
var config = require('./config.js');
var configGoogleAPI = require('./config-google-api.js');
var request = require('google-oauth-jwt').requestWithJWT();

var exports = module.exports = {};
var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

connection.connect(function(err) {
    if (err) throw 'error connecting: ' + err.stack;
    //console.log('connected as id ' + connection.threadId);
});

// check in the database query,
// if you have an outstanding response from the database,
// otherwise, we use the Google api
exports.getFirstResultGoogleAPI = function(yourQuery, callback){
    connection.query('SELECT SQL_CACHE * FROM google_api WHERE query=? LIMIT 1', [yourQuery], function(err, result) {
        if(err) throw err;
        if(result.length){
            var object = {link: result[0].first_result_url};
            callback(object);
        }
        else {
            request({
                url: 'https://www.googleapis.com/customsearch/v1?q='+yourQuery+'&cx='+configGoogleAPI.cx+'&num='+configGoogleAPI.numberResponses,
                jwt: {
                    email: configGoogleAPI.email,
                    keyFile: configGoogleAPI.keyFile,
                    scopes: configGoogleAPI.scopes
                }
            }, function (err, res, body) {

                var data = JSON.parse(body);
                var firstResultUrl = JSON.stringify(data.items[0].formattedUrl);

                var googleAPI  = {query: yourQuery, first_result_url: firstResultUrl};

                connection.query('INSERT INTO google_api SET ?', googleAPI, function(err, result) {
                    if(err) throw err;
                });
                connection.end();
                callback(data.items[0]);
            });
        }
    });
};

// Your query in Google
