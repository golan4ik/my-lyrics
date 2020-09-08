const admin = require("firebase-admin");
const firebase = require("firebase");
const { config } = require("./fbConfig");

admin.initializeApp();
firebase.initializeApp(config);

exports.db = admin.firestore();