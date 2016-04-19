/**
 * Created by prosolvo on 4/19/16.
 */
var mysql = require('mysql');
var config = require('./config.js');
var request = require('google-oauth-jwt').requestWithJWT();
// Your query in Google
var yourQuery = 'MYSQL cache table';


//Number of search results to return.
//Valid values are integers between 1 and 10, inclusive.
var numberResponses = 1;

// The custom search engine ID to use for this request.
// You might generate: Custom Search Engine -> Edit Search Engine -> Basics ->
// Sites to Search -> select: Search the entire web but emphasize included sites.
var cx = '009638576761768992256:4e4fyfcnwwa';
var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

connection.connect(function(err) {
    if (err) throw 'error connecting: ' + err.stack;
    console.log('connected as id ' + connection.threadId);
});

request({
    url: 'https://www.googleapis.com/customsearch/v1?q='+yourQuery+'&cx='+cx+'&num='+numberResponses,
    jwt: {
        // use the email address of the service account, as seen in the API console
        email: 'test-884@myprojecttest-1286.iam.gserviceaccount.com',
        // use the PEM file we generated from the downloaded key
        keyFile: 'good-key-file.pem',
        // specify the scopes you wish to access - each application has different scopes
        scopes: ['https://www.googleapis.com/auth/cse']
    }
}, function (err, res, body) {
    //console.log(res);
    var data = JSON.parse(body)
    console.log(data.items);
    var firstResultUrl = JSON.stringify(data.items[0].formattedUrl);
    console.log(firstResultUrl);

    var googleAPI  = {query: yourQuery, first_result_url: firstResultUrl};

    connection.query('INSERT INTO google_api SET ?', googleAPI, function(err, result) {
        if(err) throw err;
    });
    connection.end();
});



