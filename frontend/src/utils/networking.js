import axios from "axios";
import { useEffect, useState } from "react";

const SEARCH_URL = `/search`;
const SIGNIN_URL = "/signin";
const SIGNUP_URL = "/signup";
const LYRICS_URL = "/getLyrics";
const ADD_TO_FAVORITES_URL = "/addToFavorites";
const MAX_PER_PAGE = 20;

export const getSavedUserData = () => {
  const userItem = localStorage.getItem("user");
  let user = null;

  try {
    user = JSON.parse(userItem);

    console.log(user);

    return user || {};
  } catch (e) {
    return {};
  }
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
      if (res.status === 401) return { error: res.data, status: res.status };

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

export const signIn = ({ email, password }) => {
  return axios
    .post(SIGNIN_URL, {
      email,
      password,
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

export const signUp = ({ email, password, userName }) => {
  return axios
    .post(SIGNUP_URL, {
      email,
      password,
      userName,
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

export const getSongLyrics = (songPath, songId) => {
  return axios
    .post(LYRICS_URL, {
      songPath,
      songId,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return {
        message: e.message,
      };
    });
};

export const addToFavorites = (songId) => {
  return axios
    .post(ADD_TO_FAVORITES_URL, {
      songId,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return {
        message: e.message,
      };
    });
};
