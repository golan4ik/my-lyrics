import axios from "axios";
import { parseSearchResponse } from "./parsers";

const SEARCH_URL = "http://api.genius.com/search";

export const searchLyrics = (term) => {
  return axios
    .get(SEARCH_URL, {
      params: {
        q: term,
      },
    })
    .then((res) => {
      return parseSearchResponse(res.data);
    })
    .catch((e) => {
      console.error(e);
    });
};
