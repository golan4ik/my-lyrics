import axios from "axios";
import { GENIUS_API_ACCESS_TOKEN } from "../constants";

export default () => {
  axios.interceptors.request.use(
    function (config) {
      config.params = {
        ...config.params,
        access_token: GENIUS_API_ACCESS_TOKEN,
      };
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};
