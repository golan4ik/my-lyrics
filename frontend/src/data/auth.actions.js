export const SET_USER = "MY_LYRICS/AUTH/SET_USER";
export const SIGNIN_START = "MY_LYRICS/AUTH/SIGNIN_START";
export const ON_SIGNIN_START = "MY_LYRICS/AUTH/ON_SIGNIN_START";
export const SIGNIN_ERROR = "MY_LYRICS/AUTH/SIGNIN_ERROR";
export const SIGNUP_START = "MY_LYRICS/AUTH/SIGNUP_START";
export const ON_SIGNUP_START = "MY_LYRICS/AUTH/ON_SIGNUP_START";
export const SIGNUP_ERROR = "MY_LYRICS/AUTH/SIGNUP_ERROR";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const onSignInStart = () => ({ type: ON_SIGNIN_START });
export const signInStart = (credentials) => ({ type: SIGNIN_START, credentials });
export const signInError = (error) => ({ type: SIGNIN_ERROR, error });
export const onSignUpStart = () => ({ type: ON_SIGNUP_START });
export const signUpStart = (credentials) => ({ type: SIGNUP_START, credentials });
export const signUpError = (error) => ({ type: SIGNUP_ERROR, error });
