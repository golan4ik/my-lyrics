const axios = require("axios");
const admin = require("firebase-admin");
const db = require("../fbApp").db;
const {
  GENIUS_API_SEARCH_URL,
  GENIUS_API_SONGS_URL,
  ERROR_MESSAGES,
  ACCESS_TOKEN,
  GENIUS_BASE_URL,
} = require("../constants");
const { parseSearchResponse, extractLyricsFromJs } = require("../utils");

exports.handleSearch = (req, res) => {
  console.log(req.query);
  console.log(req.user.uid);
  axios
    .get(GENIUS_API_SEARCH_URL, {
      params: {
        ...req.query,
        access_token: ACCESS_TOKEN,
      },
    })
    .then(async (response) => {
      const results = parseSearchResponse(response.data);
      const favorites = await db
        .doc(`/users/${req.user.uid}`)
        .get("favorites")
        .then((userRef) => Object.keys(userRef.data().favorites));

      console.log("User favorites: ", favorites);

      return res
        .status(200)
        .json(
          results.map((result) =>
            favorites.includes(result.id.toString())
              ? { ...result, favorite: true }
              : result
          )
        );
    })
    .catch((e) => {
      console.error(e.message);
      res.status(500).json({ error: e.message });
    });
};

exports.addToFavorites = async (req, res) => {
  const { songId } = req.body;
  const { user } = req;

  console.log(user.uid, songId);

  const songDoc = await db.doc(`/songs/${songId}`).get();
  if (songDoc.exists) {
    console.log("Song exists");
    try {
      const result = await db.doc(`users/${user.uid}`).update(
        {
          [`favorites.${songId}`]: true,
        },
        { merge: true }
      );
      console.log("Song added to favorites: ", result);
      return res.status(200).json({ success: true });
    } catch (e) {
      return res
        .status(500)
        .json({ message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
    }
  } else {
    const songDataPromise = getSongData(songId);
    const lyricsPromise = getLyrics(songId);

    Promise.all([lyricsPromise, songDataPromise])
      .then((results) => {
        const song = {
          ...results[1],
          lyrics: results[0],
        };
        db.doc(`/songs/${songId}`)
          .set(song)
          .then(async () => {
            console.log("Song added");

            const result = await db.doc(`users/${user.uid}`).update(
              {
                [`favorites.${songId}`]: true,
              },
              { merge: true }
            );

            console.log("Song added to user: ", result);

            return res.status(200).json({ success: true });
          })
          .catch((e) => {
            console.log(e.message);
            return res.json({ error: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
          });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ error: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
      });
  }
};

const getSongData = (songId) => {
  const url = `${GENIUS_API_SONGS_URL}/${songId}`;
  return axios
    .get(url, {
      params: {
        access_token: ACCESS_TOKEN,
      },
    })
    .then((response) => {
      return parseSearchResponse(response.data);
    })
    .catch((e) => {
      return { message: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
    });
};

const getLyrics = (songId) => {
  const url = `${GENIUS_BASE_URL}/songs/${songId}/embed.js`;
  console.log(url);
  //console.log(axios);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        try {
          const lyrics = extractLyricsFromJs(data);
          resolve(lyrics);
        } catch (e) {
          reject("");
        }
      })
      .catch((e) => {
        reject("");
      });
  });
};

exports.getLyrics = (req, res) => {
  getLyrics(req.body.songId)
    .then((lyrics) => {
      return res.status(200).json({ lyrics });
    })
    .catch((e) => {
      return res
        .status(500)
        .json({ error: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
    });
};
