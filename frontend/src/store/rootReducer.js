import { combineReducers } from "redux";
import searchReducer, {
  NAME as SEARCH_NAME,
} from "../SearchBlock/data/reducer";

export default combineReducers({
  [SEARCH_NAME]: searchReducer,
});
