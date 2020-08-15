import axios from "axios";
import { GENIUS_API_ACCESS_TOKEN, BASE_API_URL } from "../constants";

axios.defaults.baseURL = BASE_API_URL;

export default () => {
  axios.interceptors.request.use(
    function (config) {
      if (config.method === "get")
        config.params.access_token = GENIUS_API_ACCESS_TOKEN;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};
