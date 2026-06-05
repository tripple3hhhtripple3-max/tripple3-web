import Cookies from "js-cookie";

import { api } from "./http";

api.interceptors.request.use(
  (config) => {
    const token =
      Cookies.get("access_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
);