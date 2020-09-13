import { NAME as SEARCH } from "./reducer";
import { NAME as RESULTS } from "./results.reducer";

const getSearch = (state) => state[SEARCH];

export const getResults = (state) => state[RESULTS];
export const getError = (state) => getSearch(state).error;
export const getIsInProcess = (state) => getSearch(state).isInprocess;
export const getTerm = (state) => getSearch(state).term;
export const getPage = (state) => getSearch(state).page;
