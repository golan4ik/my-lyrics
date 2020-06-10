export const SEARCH_START = "SEARCH/START";
export const SEARCH_SUCCESS = "SEARCH/SUCCESS";
export const SEARCH_ERROR = "SEARCH/ERROR";

export const searchStart = (term) => {
  return {
    type: SEARCH_START,
    term,
  };
};

export const searchSuccess = (results) => {
  return {
    type: SEARCH_SUCCESS,
    results,
  };
};

export const searchError = (error) => {
  return {
    type: SEARCH_ERROR,
    error,
  };
};
