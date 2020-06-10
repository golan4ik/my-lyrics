import * as actions from "./actions";

const defaultState = {
  isInprocess: false,
  results: [],
  term: "",
  error: null,
};

export const NAME = "SEARCH";

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.SEARCH_START:
      return {
        ...state,
        isInprocess: true,
        term: action.term,
        results: [],
        error: null,
      };
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        results: action.results,
        error: null,
        isInprocess: false,
      };
    case actions.SEARCH_ERROR:
      return {
        ...state,
        results: [],
        error: action.error,
        isInprocess: false,
      };
    default:
      return state;
  }
};
