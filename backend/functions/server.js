const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN, ERROR_MESSAGES } = require("./constants");
const { handleSearch, getLyrics, addToFavorites, getFavoriteSongsList, getFavoritesCount } = require("./routes/index");
const { authRoutes } = require("./routes/auth");

const app = express();
const db = admin.firestore();

const isAuthenticatedRequest = (req, res, next) => {
  let token = null;

  try {
    token = req.headers["authorization"].split("Bearer ").pop();
  } catch (e) {}

  if (!token) return res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);

  const decoded = jwt.verify(token, process.env.TOKEN_SALT);

  if (!decoded) return res.status(401).send(ERROR_MESSAGES.ACCESS_DENIED);

  try {
    console.log("token ok");
    db.collection("/users")
      .doc(`/${decoded.uid}`)
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

app.get("/search", isAuthenticatedRequest, handleSearch);
app.post("/getLyrics", isAuthenticatedRequest, getLyrics);
app.post("/addToFavorites", isAuthenticatedRequest, addToFavorites);
app.post("/getFavoriteSongsList", isAuthenticatedRequest, getFavoriteSongsList);
app.post("/getFavoritesCount", isAuthenticatedRequest, getFavoritesCount);

app.use(authRoutes);

module.exports = app;
