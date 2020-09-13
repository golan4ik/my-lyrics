const functions = require("firebase-functions");
require('dotenv').config()
require('./fbApp');

const server = require("./server");

exports.api = functions.region('europe-west1').https.onRequest(server);
