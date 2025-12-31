import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import type { Store } from "@reduxjs/toolkit";

let store: Store | undefined;

export const injectStore = (_store: Store) => {
  store = _store;
};

interface RetryAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost:5555",
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (store) {
      const accessToken = store.getState().auth?.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (
  error?: AxiosError,
  token?: string
) => {
  failedQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token!)
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config || !store) {
      return Promise.reject(error);
    }

    const originalRequest =
      error.config as RetryAxiosRequestConfig;

    if (
      originalRequest.url?.includes("/auth/refreshtoken")
    ) {
      store.dispatch({ type: "auth/logout" });
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization =
            `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refreshtoken");
        const newAccessToken = res.data.accessToken;

        store.dispatch({
          type: "auth/setAccessToken",
          payload: newAccessToken,
        });

        processQueue(undefined, newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError);
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
