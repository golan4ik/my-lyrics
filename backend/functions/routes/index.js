const axios = require("axios");
const admin = require("firebase-admin");
const firebase = require("firebase");
const { GENIUS_API_SEARCH_URL, ERROR_MESSAGES } = require("../constants");
const { parseSearchResponse } = require("../utils");

const db = admin.firestore();

exports.handleSearch = (req, res) => {
  console.log(req.query);
  axios
    .get(GENIUS_API_SEARCH_URL, {
      params: {
        ...req.query,
      },
    })
    .then((response) => {
      return res.status(200).json(parseSearchResponse(response.data));
    })
    .catch((e) => {
      console.error(e.message);
      res.status(500).json({ error: e.message });
    });
};

exports.handleSignIn = (req, res) => {
  const { email, password } = req.body;
  let user = null,
    userName = null;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      user = data.user;

      return db.collection('/users').doc(user.email).get();
    })
    .then((dbUser) => {
      userName = dbUser.data().name;
      return user.getIdToken();
    })
    .then((token) => {
      res.status(200).json({ token, userName });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(400).json({ message: e.message });
    });
};

exports.handleSignUp = (req, res) => {
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

      return db
        .doc(`/users/${newUserCredentials.email}`)
        .set(newUserCredentials);
    })
    .then(() => {
      return user.getIdToken();
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
};
