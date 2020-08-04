import { NAME } from "./reducer";

const get = (state) => state[NAME];

export const getResults = (state) => get(state).results;
export const getError = (state) => get(state).error;
export const getIsInProcess = (state) => get(state).isInprocess;
export const getTerm = (state) => get(state).term;
export const getPage = (state) => get(state).page;
