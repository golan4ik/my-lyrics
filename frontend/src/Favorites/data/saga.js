import { takeLatest, all, put, call } from "redux-saga/effects";
import { LOAD, startLoading, stopLoading, setResults } from "./actions";
import { getFavoriteSongsList } from "../../utils/networking";

const loadFavorites = async () => {
  const data = await getFavoriteSongsList();

  return data.results;
};

function* onFavoritesLoad() {
  yield put(startLoading());
  const results = yield call(loadFavorites);
  yield put(stopLoading());
  yield put(setResults(results));
}

export default function* rootSaga() {
  yield all([takeLatest(LOAD, onFavoritesLoad)]);
}
