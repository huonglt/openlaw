# OpenLaw - Server app

This is a simple nodejs HTTP server running on port 8081.<br/>
It provides an endpoint to upload an ascii file for parsing. The file size is limited to 10MB<br/>
Uploaded files are stored in a folder named uploadDir, keeping the original filename in tact<br/>
The folder uploadDir will be created when the server runs if it does not exist<br/>
The parsing result will be a JSON object containng total word count, and the counts of each occurrence of a word fields<br/>
If the parsing fails, it will return a JSON object with the error message

### Prerequisites
You need to have node, npm or yarn install<br/>
I am using node version 10.2.1, yarn version 1.7.0, npm version 5.6.0

### Installing

Clone the repo to your directory<br/>
To install npm dependencies<br/>
Run npm install <br/>
or yarn install

## To run the app
npm start or yarn start

## To run unit test
The app using jest as a test runner<br/>
npm run test or yarn test

## Further improvement
A lot more things could be done to make this a better app including<br/>
Checking uploaded file to make sure it is an ASCII file<br/>
More tests with file size closes to 10MB to check performance<br/>
Remove the file from uploadDir after parsing, cause we dont need to use it<br/>

