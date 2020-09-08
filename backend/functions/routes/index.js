const axios = require("axios");
const admin = require("firebase-admin");
const firebase = require("firebase");
const {
  GENIUS_API_SEARCH_URL,
  GENIUS_API_LYRICS_URL,
  ERROR_MESSAGES,
  ACCESS_TOKEN,
  GENIUS_BASE_URL,
} = require("../constants");
const { parseSearchResponse } = require("../utils");

const db = admin.firestore();

exports.handleSearch = (req, res) => {
  console.log(req.query);
  axios
    .get(GENIUS_API_SEARCH_URL, {
      params: {
        ...req.query,
        access_token: ACCESS_TOKEN,
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

exports.getLyrics = (req, res) => {
  const url = `${GENIUS_BASE_URL}/songs/${req.body.songId}/embed.js`;
  console.log(url);
  //console.log(axios);
  axios
    .get(url)
    .then(({data}) => {
      const match = data.match(/<p>(.*?)<.\/p>/g);
      const lyrics = match ? match[0] : '';
      let sanitized = lyrics.replace(/<.*a>/g, '');
      sanitized = sanitized.replace(/\\n/g, '');
      sanitized = sanitized.replace(/\\/g, '');


      try {
        return res.status(200).json({ lyrics: sanitized });
      } catch (e) {
        console.log(e.message);
        return res
          .status(500)
          .json({ error: "Oops. Its us. Try again in a moment" });
      }
    })
    .catch((e) => {
      console.error(e.message);
      return res.status(500).json({ error: e.message });
    });
};
