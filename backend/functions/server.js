const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ACCESS_TOKEN } = require("./constants");
const { handleSearch, handleSignIn, handleSignUp } = require("./routes/index");


const app = express();

app
  .use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.query.access_token = ACCESS_TOKEN;

  next();
});

app.get("/search", handleSearch);
app.post("/signin", handleSignIn);
app.post("/signup", handleSignUp);

module.exports = app;
