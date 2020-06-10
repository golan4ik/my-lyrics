import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { SEARCH_START, searchSuccess, searchError } from "./actions";
import { getTerm } from "./selectors";
import { searchLyrics } from "../../utils/networking";

function* searchStart() {
  const term = yield select(getTerm);
  try {
    const { results, error } = yield call(searchLyrics, term);

    if (!error) {
      yield put(searchSuccess(results));
    } else {
      yield put(searchError(error));
    }
  } catch (e) {}
}

export default function* rootSaga() {
  yield all([takeLatest(SEARCH_START, searchStart)]);
}
