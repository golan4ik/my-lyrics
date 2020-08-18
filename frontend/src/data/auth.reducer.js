import { getSavedUserData } from "../utils/networking";
import {
  SET_USER,
  ON_SIGNIN_START,
  ON_SIGNUP_START,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
} from "./auth.actions";

const initialState = {
  user: getSavedUserData().userName,
  loading: false,
  error: null,
};

export const NAME = "AUTH";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (!action.user) {
        localStorage.removeItem("user");
      }
      return {
        loading: false,
        error: null,
        user: action.user ? action.user : null,
      };

    case ON_SIGNIN_START:
    case ON_SIGNUP_START:
      return {
        loading: true,
        error: null,
        user: null,
      };

    case SIGNIN_ERROR:
    case SIGNUP_ERROR:
      return {
        loading: false,
        error: action.error,
        user: null,
      };

    default:
      return state;
  }
};
