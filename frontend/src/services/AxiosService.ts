import axios from "axios";
import Cookies from "js-cookie";
import { memoizedRefreshToken } from "./RefreshTokenService";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}`,
});

api.interceptors.request.use((config) => {
  const isAuthRequired = config?.headers?.isAuthRequired;

  if (isAuthRequired) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
  }

  delete config.headers.isAuthRequired;
  return config;
});

const refreshTokenInstance = axios.create({
  baseURL: `${API_URL}`,
});

export const axiosRefTokenInst = refreshTokenInstance;

refreshTokenInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (e) => {
    localStorage.removeItem("token");
    Cookies.remove("refreshToken", { path: "/", domain: "localhost" });
  },
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const errStatus = err?.response?.status;

    if (errStatus !== 401 || !localStorage.getItem("token")) {
      return Promise.reject(err);
    }

    const result = await memoizedRefreshToken();

    if (result) {
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: result.accessToken,
      };
      return api(originalConfig);
    } else {
      return Promise.reject(err);
    }
  },
);

export default api;
