import axios from "axios";

const SEARCH_URL = `/search`;
const MAX_PER_PAGE = 20;

export const searchLyrics = (q, page = 1) => {
  return axios
    .get(SEARCH_URL, {
      params: {
        q,
        per_page: MAX_PER_PAGE, // https://genius.com/discussions/267781-Search-api-results
        page,
      },
    })
    .then((res) => {
      return { results: res.data };
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
