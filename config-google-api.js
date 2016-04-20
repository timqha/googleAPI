module.exports = {
//Number of search results to return.
//Valid values are integers between 1 and 10, inclusive.
    numberResponses: 1,

// The custom search engine ID to use for this request.
// You might generate: Custom Search Engine -> Edit Search Engine -> Basics ->
// Sites to Search -> select: Search the entire web but emphasize included sites.
    cx: '009638576761768992256:4e4fyfcnwwa',

    // use the email address of the service account, as seen in the API console
    email: 'test-884@myprojecttest-1286.iam.gserviceaccount.com',
    // use the PEM file we generated from the downloaded key
    keyFile: 'good-key-file.pem',
    // specify the scopes you wish to access - each application has different scopes
    scopes: ['https://www.googleapis.com/auth/cse']
};
