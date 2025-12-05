import axios, { InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '@/shared/config/app';
import { loadTokens, persistTokens, resetTokens } from '@/shared/lib/token-storage';

export const axiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = loadTokens();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;
    const isUnauthorized = error.response?.status === 401;
    const hasRetried = originalRequest?._retry;

    if (isUnauthorized && !hasRetried) {
      originalRequest._retry = true;
      const { refreshToken } = loadTokens();

      if (!refreshToken) {
        resetTokens();
        return Promise.reject(error);
      }

      try {
        const { data } = await axiosInstance.post('/auth/refresh', {
          refreshToken
        });

        persistTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user
        });

        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return axiosInstance(originalRequest!);
      } catch (refreshError) {
        resetTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
