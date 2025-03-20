import { axiosRefTokenInst } from "./AxiosService";
import Cookies from "js-cookie";
import memoize from "memoize";

const refreshTokenFn = async () => {
  const response = await axiosRefTokenInst.post("/auth/refresh", {
    refreshToken: Cookies.get("refreshToken"),
  });

  if (response) {
    localStorage.setItem("token", response.data.accessToken);
  }
  return response?.data;
};

const maxAge = 10000;

export const memoizedRefreshToken = memoize(refreshTokenFn, {
  maxAge,
});
