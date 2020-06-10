import { all } from "redux-saga/effects";
import searchSaga from "../SearchBlock/data/saga";

export default function* rootSaga() {
  yield all([searchSaga()]);
}
