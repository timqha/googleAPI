#SQL CREATE TABLE

## Installation:

### Create MySQL Query

    CREATE TABLE `res_google_api` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `query` VARCHAR(255) NOT NULL,
        `first_result_url` VARCHAR(255) NOT NULL,
        `timestamp` TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`));

## Install the module:

    npm i https://github.com/AminaG/google-first-result/edit/master/readme.md

## Example of use:

    var firstResult=require('google-first-result');
    
    firstResult({
        cx: '009638576761768992222:4d4fyfcnwwa',
            // The custom search engine ID to use for this request.
            // You might generate: Custom Search Engine -> Edit Search Engine -> Basics ->
            // Sites to Search -> select: Search the entire web but emphasize included sites.
        email: 'test@myprojecttest.gserviceaccount.com',    
            // use the email address of the service account, as seen in the API console
        keyFile: 'your-key-file.pem',
            // use the PEM file we generated from the downloaded key
            //comand in terminal: openssl pkcs12 -in downloaded-key-file.p12 -out your-key-file.pem -nodes
    },function(err,url){
        console.log(url)
    })
    
