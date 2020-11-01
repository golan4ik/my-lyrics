const express = require("express");
const firebase = require("firebase");
const db = require("../fbApp").db;
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES } = require("../constants");
const router = express.Router();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  let user = null,
    userName = null;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      user = data.user;

      return db.collection("/users").doc(user.uid).get();
    })
    .then((dbUser) => {
      userName = dbUser.data().name;
      return jwt.sign(user.toJSON(), process.env.TOKEN_SALT);
    })
    .then((token) => {
      res.status(200).json({ token, userName });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(400).json({ message: e.message });
    });
});

router.post("/signup", (req, res) => {
  const { email, password, userName } = req.body;
  console.log("signin up");

  let user = null;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      user = data.user;

      const newUserCredentials = {
        email: user.email,
        id: user.uid,
        name: userName,
      };

      return db.doc(`/users/${newUserCredentials.id}`).set(newUserCredentials);
    })
    .then(() => {
      return jwt.sign(user.toJSON(), process.env.TOKEN_SALT);
    })
    .then((token) => {
      res.status(200).json({ token });
    })
    .catch((e) => {
      console.log(e.code);
      res.status(400).json({
        message:
          e.code === "auth/email-already-in-use"
            ? e.message
            : ERROR_MESSAGES.INCORRECT_CREDENTIALS,
      });
    });
});

exports.authRoutes = router;
