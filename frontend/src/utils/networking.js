import axios from "axios";
import { parseSearchResponse } from "./parsers";

const SEARCH_URL = "http://api.genius.com/searchdd";

export const searchLyrics = (term) => {
  return axios
    .get(SEARCH_URL, {
      params: {
        q: term,
      },
    })
    .then((res) => {
      return { results: parseSearchResponse(res.data) };
    })
    .catch((e) => {
      return {
        error: {
          message: e.message,
          status: e.response.status,
        },
      };
    });
};
