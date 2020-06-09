const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { handleSearch } = require("./routes/index");

app
  .use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

app.get("/search", handleSearch);

module.exports = app;
