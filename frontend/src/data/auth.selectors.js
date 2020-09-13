import { NAME } from "./auth.reducer";

const get = (state) => state[NAME];

export const getIsLoading = (state) => get(state).loading;
export const getUser = (state) => get(state).user;
export const getError = (state) => get(state).error;
