import { NAME } from "./reducer";

const get = (state) => state[NAME];

export const getFavorites = (state) => get(state).results;
export const getIsLoading = (state) => state[NAME].loading;
export const getError = (state) => state[NAME].error;
