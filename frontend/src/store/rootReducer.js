import { combineReducers } from "redux";
import searchReducer, {
  NAME as SEARCH_NAME,
} from "../SearchBlock/data/reducer";
import searchResultsReducer, {
  NAME as SEARCH_RESULTS_NAME,
} from "../SearchBlock/data/results.reducer";
import authReducer, { NAME as AUTH_NAME } from "../data/auth.reducer";

export default combineReducers({
  [SEARCH_NAME]: searchReducer,
  [SEARCH_RESULTS_NAME]: searchResultsReducer,
  [AUTH_NAME]: authReducer,
});
