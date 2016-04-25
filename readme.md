#SQL CREATE TABLE

CREATE TABLE `nodemysql`.`res_google_api` (

    `id` INT NOT NULL AUTO_INCREMENT,

    `query` VARCHAR(255) NOT NULL,

    `first_result_url` VARCHAR(255) NOT NULL,

    `timestamp` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id`));



## for reference

    //Number of search results to return.
    //Valid values are integers between 1 and 10, inclusive

    #private variable

    numberResponses: default 1,

    // specify the scopes you wish to access - each application has different scopes
    // for Google Custom Search Engine
    scopes: ['https://www.googleapis.com/auth/cse']

    #public variable

    // The custom search engine ID to use for this request.
    // You might generate: Custom Search Engine -> Edit Search Engine -> Basics ->
    // Sites to Search -> select: Search the entire web but emphasize included sites.
        cx: '009638576761768992222:4d4fyfcnwwa',

    // use the email address of the service account, as seen in the API console
    email: 'test@myprojecttest.gserviceaccount.com',
    // use the PEM file we generated from the downloaded key
    //comand in terminal: openssl pkcs12 -in downloaded-key-file.p12 -out your-key-file.pem -nodes
    keyFile: 'your-key-file.pem',
