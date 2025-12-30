import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface QueueItem {
  resolve: () => void;
  reject: (err: unknown) => void;
}

const api = axios.create({
  baseURL: "http://localhost:5555",
  withCredentials: true,
});

let isRefreshing = false;
let queue: QueueItem[] = [];

const processQueue = (err: unknown) => {
  queue.forEach(p => (err ? p.reject(err) : p.resolve()));
  queue = [];
};

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const original = err.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      err.response?.status === 401 &&
      !original._retry &&
      original.url &&
      !original.url.includes("/auth/refreshtoken")
    ) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          queue.push({ resolve: () => resolve(api(original)), reject });
        });
      }

      isRefreshing = true;
      try {
        await api.post("/auth/refreshtoken");
        processQueue(null);
        return api(original);
      } catch (e: unknown) {
        processQueue(e);
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
