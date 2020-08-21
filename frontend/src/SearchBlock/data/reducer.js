import * as actions from "./actions";

const defaultState = {
  isInprocess: false,
  term: "Godzilla",
  error: null,
  page: 1,
};

export const NAME = "SEARCH";

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_SEARCH_PROCESS:
      return {
        ...state,
        isInprocess: action.value,
      };
    case actions.INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1 || 1,
      };
    case actions.UPDATE_SEARCH_TERM:
      return {
        ...state,
        term: action.term,
        page: 1,
      };
    case actions.SEARCH_START:
      return {
        ...state,
        isInprocess: true,
        error: null,
      };
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        error: null,
        isInprocess: false,
      };
    case actions.SEARCH_ERROR:
      return {
        ...state,
        error: action.error,
        isInprocess: false,
      };
    default:
      return state;
  }
};
