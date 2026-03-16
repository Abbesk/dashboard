import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { apiLink, eAdminLink } from "./ApiLink";

const cache = {};
let isRefreshing = null;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp - currentTime < 120;
  } catch {
    return true;
  }
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  const start = performance.now();
  try {
    const res = await axios.post(`${apiLink}/refresh/`, { refresh });
    localStorage.setItem("access", res.data.access);
    return res.data.access;
  } catch (err) {
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
}

export async function fetchWithCache(instance, url, forceRefresh = false) {
  if (cache[url] && !forceRefresh) return cache[url];
  const res = await instance.get(url);
  cache[url] = res.data;
  return res.data;
}

function createAxiosInstance(baseURL) {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(async (config) => {
    let access = localStorage.getItem("access");
    if (isTokenExpired(access)) {
      if (!isRefreshing) {
        isRefreshing = refreshAccessToken();
        isRefreshing.then((token) => onRefreshed(token))
                    .finally(() => { isRefreshing = null; });
      }
      if (isRefreshing) {
        access = await new Promise((resolve) => subscribeTokenRefresh(resolve));
      }
    }

    if (access) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${access}`;
    }

    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalReq = err.config;
      if (err.response?.status === 401 && !originalReq._retry) {
        originalReq._retry = true;

        let newToken;
        if (!isRefreshing) {
          isRefreshing = refreshAccessToken();
          isRefreshing.then((token) => onRefreshed(token))
                      .finally(() => { isRefreshing = null; });
        }

        if (isRefreshing) {
          newToken = await new Promise((resolve) => subscribeTokenRefresh(resolve));
        }

        if (newToken) {
          originalReq.headers = originalReq.headers || {};
          originalReq.headers["Authorization"] = `Bearer ${newToken}`;
          return instance.request(originalReq);
        }
      }

      return Promise.reject(err);
    }
  );

  setInterval(async () => {
    const token = localStorage.getItem("access");
    if (token && isTokenExpired(token) && !isRefreshing) {
      isRefreshing = refreshAccessToken();
      isRefreshing.then((t) => onRefreshed(t))
                  .finally(() => { isRefreshing = null; });
    }
  }, 60 * 1000);

  return instance;
}

export const axiosAdmin = createAxiosInstance(eAdminLink);
export const axiosApi = createAxiosInstance(apiLink);
