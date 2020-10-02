import { LOADING_START, RESULTS_SET, LOADING_STOP } from "./actions";

export const NAME = "FAVORITES";

const initialState = {
  loading: false,
  results: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    case RESULTS_SET:
      return {
        ...state,
        results: [...action.results],
      };
    default:
      return state;
  }
};
