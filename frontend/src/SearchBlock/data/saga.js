import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import {
  SEARCH_START,
  searchSuccess,
  searchError,
  LOAD_MORE,
  incrementPage,
  setSearchProcess,
  ON_LYRICS_LOAD_START,
  lyricsLoadSuccess,
  LYRICS_ADD_TO_FAVORITES_START,
  updateSongData,
} from "./actions";
import { getTerm, getPage } from "./selectors";
import {
  searchLyrics,
  getSongLyrics,
  addToFavorites,
  getFavoritesCount,
} from "../../utils/networking";
import { getSongById } from "./results.selectors";

function* loadMore() {
  yield put(incrementPage());
  yield put(setSearchProcess(true));
  yield call(onSearchStart);
}

function* onSearchStart() {
  const term = yield select(getTerm);
  const page = yield select(getPage);
  try {
    const { results, error } = yield call(searchLyrics, term, page);

    if (!error) {
      yield put(searchSuccess(results));
    } else {
      /* localStorage.removeItem("user");
      yield put(setUser(null)); */
      yield put(searchError(error));
    }
  } catch (e) {}
}

function* onLyricsLoadStartSaga({ songPath, songId }) {
  yield put(updateSongData(songId, { disabled: true }));
  const { lyrics, error } = yield call(getSongLyrics, songPath, songId);

  error && console.log(error);

  yield put(lyricsLoadSuccess(songPath, lyrics));
  yield put(updateSongData(songId, { disabled: false }));
}

function* onAddToFavoritesSaga({ songId }) {
  const song = yield select(getSongById, songId);
  const { favorite } = song;
  yield put(updateSongData(songId, { disabled: true }));
  const { success, error } = yield call(addToFavorites, songId);

  if (success) {
    //console.log('Song added to favorites');
    const count = yield call(getFavoritesCount);
    console.log(count);

    // TODO: add validation here

    yield put(updateSongData(songId, { favorite: !favorite, disabled: false }));
  } else if (error) {
    console.log("Failed to add song to favorites");
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(SEARCH_START, onSearchStart),
    takeLatest(LOAD_MORE, loadMore),
    takeEvery(ON_LYRICS_LOAD_START, onLyricsLoadStartSaga),
    takeEvery(LYRICS_ADD_TO_FAVORITES_START, onAddToFavoritesSaga),
  ]);
}
