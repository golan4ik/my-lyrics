const axios = require("axios");
const { GENIUS_API_SEARCH_URL } = require("../constants");
const { parseSearchResponse } = require("../utils");

exports.handleSearch = (req, res) => {
  console.log(req.query);
  axios
    .get(GENIUS_API_SEARCH_URL, {
      params: {
        ...req.query
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
