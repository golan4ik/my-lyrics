export const LOADING_START = "FAVORITES/LOADING/START";
export const LOADING_STOP = "FAVORITES/LOADING/START";
export const LOAD = "FAVORITES/LOAD";
export const RESULTS_SET = "FAVORITES/RESULTS/SET";

export const loadFavorites = () => {
  return {
    type: LOAD,
  };
};

export const startLoading = () => {
  return {
    type: LOADING_START,
  };
};

export const stopLoading = () => {
  return {
    type: LOADING_STOP,
  };
};

export const setResults = (results) => {
  return {
    type: RESULTS_SET,
    results,
  };
};
