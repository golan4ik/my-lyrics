import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  SIGNIN_START,
  SIGNUP_START,
  onSignInStart,
  onSignUpStart,
  setUser,
  signInError,
} from "./auth.actions";
import { signIn } from "../utils/networking";

function* signInStartSaga({ credentials }) {
  console.log(credentials);
  yield put(onSignInStart());

  const { token, userName, message } = yield call(signIn, credentials);

  if (!message) {
    localStorage.setItem("user", JSON.stringify({ token, userName }));
    yield put(setUser(userName));
  } else {
    yield put(signInError(message));
  }
}
function* signUpStartSaga(credentials) {
  console.log(credentials);
  yield put(onSignUpStart());
}

export default function* authSaga() {
  yield all([
    takeLatest([SIGNIN_START], signInStartSaga),
    takeLatest([SIGNUP_START], signUpStartSaga),
  ]);
}
