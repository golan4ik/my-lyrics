import { all, put, takeLatest } from "redux-saga/effects";
import {
  SIGNIN_START,
  SIGNUP_START,
  onSignInStart,
  onSignUpStart,
} from "./auth.actions";
import { signIn } from "../utils/networking";

function* signInStartSaga({credentials}) {
  console.log(credentials);
  yield put(onSignInStart());

  signIn(credentials).then((res) => console.log(res));
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
