import { all } from "redux-saga/effects";
import authSaga from "../data/auth.saga";
import searchSaga from "../SearchBlock/data/saga";
import favoritesSaga from "../Favorites/data/saga";

export default function* rootSaga() {
  yield all([authSaga(), searchSaga(), favoritesSaga()]);
}
