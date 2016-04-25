/**
 * Created by prosolvo on 4/24/16.
 */
var firstResultGoogleAPI = require('./first-result-google-api');
var config = require('./config.js');
var mysql = require('mysql');

GLOBAL.connection = (global.connection ? global.connection : mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
}));
GLOBAL.connection.connect(function(err) {
    if (err) throw 'error connecting: ' + err.stack;
    //console.log('connected as id ' + connection.threadId);
});

// query for select
var myQuery = 'MYSQL cache TABLE n';

firstResultGoogleAPI.getFirstResultGoogleAPI({
    cx: '009638576761768992256:4e4fyfcnwwa',
    email: 'test-884@myprojecttest-1286.iam.gserviceaccount.com',
    keyFile: 'good-key-file.pem',
    yourQuery: myQuery
}, function(result){
    console.log(result);
});