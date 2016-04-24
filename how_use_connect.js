/**
 * Created by prosolvo on 4/24/16.
 */
var connect = require('./connect');

// query for select
var myQuery = 'MYSQL cache TABLE';

connect.getFirstResultGoogleAPI(myQuery, function(result){
    console.log(result);
});

