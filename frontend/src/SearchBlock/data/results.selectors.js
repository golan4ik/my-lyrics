import { NAME as RESULTS } from "./results.reducer";

const getResults = (state) => state[RESULTS];

export const getSongById = (state, songId) =>
  getResults(state).find((song) => song.id === songId);
