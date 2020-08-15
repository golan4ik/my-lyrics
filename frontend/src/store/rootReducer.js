import { combineReducers } from "redux";
import searchReducer, {
  NAME as SEARCH_NAME,
} from "../SearchBlock/data/reducer";
import authReducer, { NAME as AUTH_NAME } from "../data/auth.reducer";

export default combineReducers({
  [SEARCH_NAME]: searchReducer,
  [AUTH_NAME]: authReducer,
});
