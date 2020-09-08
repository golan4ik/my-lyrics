export const SEARCH_START = "SEARCH/START";
export const SEARCH_SUCCESS = "SEARCH/SUCCESS";
export const SEARCH_ERROR = "SEARCH/ERROR";
export const UPDATE_SEARCH_TERM = "SEARCH/TERM/UPDATE";
export const INCREMENT_PAGE = "SEARCH/PAGE/INCREMENT";
export const LOAD_MORE = "SEARCH/LOAD_MORE";
export const SET_SEARCH_PROCESS = "SEARCH/PROCESS/SET";
export const ON_LYRICS_LOAD_START = "SEARCH/LYRICS/ON_LOAD/START";
export const LYRICS_LOAD_START = "SEARCH/LYRICS/ON_LOAD/START";
export const LYRICS_LOAD_SUCCESS = "SEARCH/LYRICS/ON_LOAD/SUCCESS";
export const LYRICS_LOAD_ERROR = "SEARCH/LYRICS/ON_LOAD/ERROR";

export const onLyricsLoadStart = (songPath, songId) => {
  return {
    type: ON_LYRICS_LOAD_START,
    songPath,
    songId
  };
};

export const lyricsLoadStart = (songPath) => {
  return {
    type: LYRICS_LOAD_START,
    songPath,
  };
};

export const lyricsLoadSuccess = (songPath, lyrics) => {
  return {
    type: LYRICS_LOAD_SUCCESS,
    songPath,
    lyrics,
  };
};

export const lyricsLoadError = (songPath, error) => {
  return {
    type: LYRICS_LOAD_ERROR,
    songPath,
    error,
  };
};

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
