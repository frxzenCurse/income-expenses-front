import * as api from './endpoints';
import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage";
import type { RefreshResponse } from './types';

const $api = axios.create({
  baseURL: api.API_DOMAIN,
  withCredentials: true,
})


$api.interceptors.request.use(config => {
  const token = getFromLocalStorage("access_token")
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry && originalRequest.url !== '/auth/refresh' && originalRequest.url !== '/auth/login') {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return $api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post<RefreshResponse>(api.REFRESH_TOKEN, {}, {
          withCredentials: true,
        })
        const newAccessToken = response.data.accessToken;

        setToLocalStorage('access_token', `Bearer ${newAccessToken}`)

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;