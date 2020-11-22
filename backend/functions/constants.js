require("dotenv");

exports.ACCESS_TOKEN = process.env.ACCESS_TOKEN;
exports.GENIUS_BASE_URL = "http://genius.com";
exports.GENIUS_API_SEARCH_URL = "http://api.genius.com/search";
exports.GENIUS_API_SONGS_URL = "http://api.genius.com/songs";
exports.ERROR_MESSAGES = {
  SOMETHING_WENT_WRONG: "Something went wrong on server side",
  INCORRECT_CREDENTIALS: "Incorrect credentials",
  ACCESS_DENIED: "Access denied",
};
