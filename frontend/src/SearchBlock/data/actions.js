export const SEARCH_START = "SEARCH/START";
export const SEARCH_SUCCESS = "SEARCH/SUCCESS";
export const SEARCH_ERROR = "SEARCH/ERROR";
export const UPDATE_SEARCH_TERM = "SEARCH/TERM/UPDATE";
export const INCREMENT_PAGE = "SEARCH/PAGE/INCREMENT";
export const LOAD_MORE = "SEARCH/LOAD_MORE";
export const SET_SEARCH_PROCESS = "SEARCH/PROCESS/SET";

export const setSearchProcess = (value) => {
  return {
    type: SET_SEARCH_PROCESS,
    value,
  };
};

export const loadMore = () => {
  return {
    type: LOAD_MORE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_PAGE,
  };
};

export const updateTerm = (term) => {
  return {
    type: UPDATE_SEARCH_TERM,
    term,
  };
};

export const searchStart = () => {
  return {
    type: SEARCH_START,
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
