# OpenLaw - Server app

This is a simple nodejs HTTP server running on port 8081.<br/>
It provides an endpoint to upload an ascii file for parsing. The file size is limited to 10MB<br/>
The parsing result will have total word count, and the counts of each occurrence of a word<br/>
If the parsing fails, it will return an error to the client

### Prerequisites
You need to have node, npm or yarn install<br/>
I am using node version 10.2.1, yarn version 1.7.0, npm version 5.6.0

### Installing

Clone the repo to your directory
Run npm install or yarn install to install npm dependencies

## To run the app
npm start or yarn start

## To run unit test
npm run test or yarn test



