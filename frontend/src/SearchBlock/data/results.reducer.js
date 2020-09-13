import * as actions from "./actions";

const initialState = [];

export const NAME = "SEARCH_RESULTS";

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SONG_DATA:
      return state.map((song) => {
        return song.id === action.id ? { ...song, ...action.data } : song;
      });
    case actions.LYRICS_LOAD_START:
      return state.map((song) => {
        if (song.path === action.songPath) song.loadingLyrics = true;
        return song;
      });
    case actions.LYRICS_LOAD_SUCCESS:
      return state.map((song) => {
        if (song.path === action.songPath) {
          song.loadingLyrics = false;
          song.lyrics = action.lyrics;
        }
        return song;
      });
    case actions.LYRICS_LOAD_ERROR:
      return state;
    case actions.SEARCH_START:
      return [];
    case actions.SEARCH_SUCCESS:
      return [...state, ...action.results];
    case actions.SEARCH_ERROR:
      return [];
    default:
      return state;
  }
};
