const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt_decode = require("jwt-decode");
const { ACCESS_TOKEN, ERROR_MESSAGES } = require("./constants");
const { handleSearch, handleSignIn, handleSignUp } = require("./routes/index");

const app = express();

const isAuthenticatedRequest = (req, res, next) => {
  let token = null;

  try {
    token = req.headers["authorization"].split("Bearer ").pop();
  } catch (e) {}

  if (!token) return res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);

  try {
    const decoded = jwt_decode(token);
    req.user = decoded;
    next();
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
