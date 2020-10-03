const axios = require("axios");
const orderBy = require("lodash").orderBy;
const db = require("../fbApp").db;
const firebase = require("../fbApp").firebase;
const {
  GENIUS_API_SEARCH_URL,
  GENIUS_API_SONGS_URL,
  ERROR_MESSAGES,
  ACCESS_TOKEN,
  GENIUS_BASE_URL,
} = require("../constants");
const { parseSearchResponse, extractLyricsFromJs } = require("../utils");
const { firestore } = require("firebase-admin");

const getFavoritesDocs = async (userId) => {
  return await db.collection(`/users/${userId}/favorites`).get();
};

const getUserFavorites = (uid) =>
  getFavoritesDocs(uid).then((favorites) =>
    favorites.docs.map((doc) => {
      return { songId: parseInt(doc.id), ...doc.data() };
    })
  );

const getFavoriteSongsList = async (
  uid,
  sortBy = "addedAtMillis",
  sortDirection = "desc",
  withLyrics = true
) => {
  const favorites = await db
    .collection(`/users/${uid}/favorites`)
    .get()
    .then((favorites) => {
      const favsArray = favorites.docs.map((doc) => {
        return {
          songId: parseInt(doc.id),
          ...doc.data(),
          addedAtMillis: doc.data().addedAt.toMillis(),
        };
      });

      const sortedArray = orderBy(favsArray, [sortBy], [sortDirection]);

      //console.log(favsArray, sortedArray);

      return sortedArray;
    });

  const songs = await db
    .collection("songs")
    .where(
      "id",
      "in",
      Object.values(favorites).map((fav) => fav.songId)
    )
    .get()
    .then((favs) => {
      return favorites.map((favorite) => {
        const songDoc = favs.docs
          .find((doc) => doc.data().id === favorite.songId)
          .data();
        return { ...songDoc, favorite: true }; // TODO: assuming doc was found
      });
    });

  //console.log(songs);

  return songs;
};

exports.getFavoriteSongsList = async (req, res) => {
  const songs = await getFavoriteSongsList(req.user.uid);

  return res.status(200).json(songs);
};

exports.handleSearch = (req, res) => {
  console.log(req.query);
  console.log(req.user.uid);
  console.log(ACCESS_TOKEN);
  axios
    .get(GENIUS_API_SEARCH_URL, {
      params: {
        ...req.query,
        access_token: ACCESS_TOKEN,
      },
    })
    .then(async (response) => {
      const results = parseSearchResponse(response.data);
      const favorites = await getUserFavorites(req.user.uid);

      //console.log("User favorites: ", await getFavoriteSongsList(req.user.uid));

      return res
        .status(200)
        .json(
          results.map((result) =>
            favorites.find((favorite) => favorite.songId === result.id)
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
  const favorites = await getUserFavorites(user.uid);
  const isAlreadyFavorite = favorites.find(
    (favorite) => favorite.songId === songId
  );

  if (songDoc.exists) {
    console.log("Song exists");
    try {
      if (isAlreadyFavorite) {
        await db
          .doc(`users/${user.uid}/favorites/${songId.toString()}`)
          .delete();
        console.log("Song removed from favorites");
      } else {
        await db.doc(`users/${user.uid}/favorites/${songId.toString()}`).set({
          addedAt: firestore.Timestamp.now(),
        });
        console.log("Song added to favorites");
      }

      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e.message);
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

            console.log("Song added to favorites: ", result);

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

exports.getFavoritesCount = async (req, res) => {
  const docs = (await getFavoritesDocs(req.user.uid)).docs;

  return res
    .status(200)
    .json({ result: docs ? docs.map((doc) => doc.data()).length : docs.length });
};
