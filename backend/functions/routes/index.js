const axios = require("axios");
const { access_token } = require("../constants");
const { parseSearchResponse } = require("../utils");

exports.handleSearch = (req, res) => {
  const term = req.query.q;
  axios
    .get(`http://api.genius.com/search?q=${term}&access_token=${access_token}`)
    .then((response) => {
      return res.status(200).json(parseSearchResponse(response.data));
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: e });
    });
};
