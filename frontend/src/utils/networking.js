import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const SEARCH_URL = `/search`;
const SIGNIN_URL = "/signin";
const MAX_PER_PAGE = 20;

export const getSavedUserData = () => {
  const token = localStorage.getItem("TOKEN");
  let user = null;

  try {
    user = jwt_decode(token);
  } catch (e) {}

  console.log(user);

  return user;
};

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getSavedUserData();

    setIsAuthenticated(!!user);
  }, [isAuthenticated, setIsAuthenticated]);

  return [isAuthenticated];
};

export const searchLyrics = (q, page = 1) => {
  return axios
    .get(SEARCH_URL, {
      params: {
        q,
        per_page: MAX_PER_PAGE, // https://genius.com/discussions/267781-Search-api-results
        page,
      },
    })
    .then((res) => {
      return { results: res.data };
    })
    .catch((e) => {
      return {
        error: {
          message: e.message,
          status: e.response.status,
        },
      };
    });
};

export const signIn = (credentials) => {
  return axios
    .post(SIGNIN_URL, {
      credentials,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return {
        error: "Server error",
      };
    });
};
