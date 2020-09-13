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
  lyricsLoadStart,
  lyricsLoadSuccess,
  LYRICS_ADD_TO_FAVORITES_START,
  onLyricsAddToFavorites,
  updateSongData,
} from "./actions";
import { getTerm, getPage } from "./selectors";
import {
  searchLyrics,
  getSongLyrics,
  addToFavorites,
} from "../../utils/networking";
import { setUser } from "../../data/auth.actions";
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
      localStorage.removeItem("user");
      yield put(setUser(null));
      yield put(searchError(error));
    }
  } catch (e) {}
}

function* onLyricsLoadStartSaga({ songPath, songId }) {
  //yield put(lyricsLoadStart(songPath));
  const { lyrics, error } = yield call(getSongLyrics, songPath, songId);

  error && console.log(error);

  yield put(lyricsLoadSuccess(songPath, lyrics));
}

function* onAddToFavoritesSaga({ songId }) {
  const { success, error } = yield call(addToFavorites, songId);

  if (success) {
    //console.log('Song added to favorites');
    const song = yield select(getSongById, songId);

    // TODO: add validation here

    song.favorite = true;

    console.log(song);

    yield put(updateSongData(song));
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
