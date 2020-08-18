const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt_decode = require("jwt-decode");
const { ACCESS_TOKEN, ERROR_MESSAGES } = require("./constants");
const { handleSearch, handleSignIn, handleSignUp } = require("./routes/index");

const app = express();
const db = admin.firestore();

const isAuthenticatedRequest = (req, res, next) => {
  let token = null;

  try {
    token = req.headers["authorization"].split("Bearer ").pop();
  } catch (e) {}

  if (!token) return res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);

  try {
    const decoded = jwt_decode(token);
    console.log(decoded);
    db.collection("/users")
      .doc(`/${decoded.user_id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          req.user = decoded;
          next();
        } else {
          res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);
        }
      });
  } catch (ex) {
    res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);
  }
};

app
  .use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.query.access_token = ACCESS_TOKEN;

  next();
});

app.get("/search", isAuthenticatedRequest, handleSearch);
app.post("/signin", handleSignIn);
app.post("/signup", handleSignUp);

module.exports = app;
