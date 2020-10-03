import { takeLatest, all, put, call } from "redux-saga/effects";
import {
  LOAD,
  startLoading,
  stopLoading,
  setResults,
  FAVORITE_REMOVE,
} from "./actions";
import { getFavoriteSongsList, addToFavorites } from "../../utils/networking";

const loadFavorites = async () => {
  const data = await getFavoriteSongsList();

  return data.results;
};

const removeFromFavorites = async (songId) => {
    const data = await addToFavorites(songId);

    return data.result;
}

function* onFavoritesLoad(action) {
  yield put(startLoading());
  const results = yield call(loadFavorites);
  yield put(stopLoading());
  yield put(setResults(results));
}

function* removeFromFavoritesSaga(action) {
  yield put(startLoading());
  yield call(removeFromFavorites, action.songId);
  const results = yield call(loadFavorites);
  yield put(stopLoading());
  yield put(setResults(results));
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOAD, onFavoritesLoad),
    takeLatest(FAVORITE_REMOVE, removeFromFavoritesSaga),
  ]);
}
