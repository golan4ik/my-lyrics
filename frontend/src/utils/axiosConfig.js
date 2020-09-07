import axios from "axios";
import { BASE_API_URL } from "../constants";
import { getSavedUserData } from "./networking";

axios.defaults.baseURL = BASE_API_URL;

export default () => {
  axios.interceptors.request.use(
    function (config) {
      config.headers.authorization = `Bearer ${getSavedUserData().token}`;
      
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};
