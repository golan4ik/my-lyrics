import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { SEARCH_START, searchSuccess, searchError, LOAD_MORE, incrementPage } from "./actions";
import { getTerm, getPage } from "./selectors";
import { searchLyrics } from "../../utils/networking";

function* loadMore(){
  yield put(incrementPage());

  yield call(searchStart);
}

function* searchStart() {
  const term = yield select(getTerm);
  const page = yield select(getPage);
  try {
    const { results, error } = yield call(searchLyrics, term, page);

    if (!error) {
      yield put(searchSuccess(results));
    } else {
      yield put(searchError(error));
    }
  } catch (e) {}
}

export default function* rootSaga() {
  yield all([takeLatest(SEARCH_START, searchStart), takeLatest(LOAD_MORE, loadMore)]);
}
