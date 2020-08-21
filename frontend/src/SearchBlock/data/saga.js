import { all, call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
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
} from "./actions";
import { getTerm, getPage } from "./selectors";
import { searchLyrics, getSongLyrics } from "../../utils/networking";
import { setUser } from "../../data/auth.actions";

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

function* onLyricsLoadStartSaga({songPath}) {
  //yield put(lyricsLoadStart(songPath));
  const {lyrics, error} = yield call(getSongLyrics, songPath);

  error && console.log(error);

  yield put(lyricsLoadSuccess(songPath, lyrics));
}

export default function* rootSaga() {
  yield all([
    takeLatest(SEARCH_START, onSearchStart),
    takeLatest(LOAD_MORE, loadMore),
    takeEvery(ON_LYRICS_LOAD_START, onLyricsLoadStartSaga),
  ]);
}
