import axios from 'axios';
import { axiosConfig } from '~/config/axios';
import { APP_ID_HEADER_NAME, AUTH_HEADER_NAME } from '~/services/headers';

interface AxiosClientConfig {
  readonly appId?: string;
  readonly accessToken?: string;
  readonly onUploadProgress?: (progress: number) => any;
  readonly onDownloadProgress?: (progress: number) => any;
}

export function axiosClient(data: AxiosClientConfig) {
  const accessToken = data?.accessToken;
  const appId = data?.appId;

  const api = axios.create(axiosConfig);

  api.interceptors.request.use((config) => {
    if (data?.onDownloadProgress) {
      config.onDownloadProgress = (progressEvent) => {
        progressEvent?.srcElement?.getResponseHeader('content-length');
        const total = parseFloat(progressEvent.total);
        const current = parseFloat(progressEvent.loaded);
        let percentCompleted = Math.floor((current / total) * 100);
        data.onDownloadProgress(percentCompleted);
      };
    }
    if (data?.onUploadProgress) {
      config.onUploadProgress = (progressEvent) => {
        const total = parseFloat(progressEvent.total);
        const current = parseFloat(progressEvent.loaded);
        let percentCompleted = Math.floor((current / total) * 100);
        data.onUploadProgress(percentCompleted);
      };
    }
    return config;
  });

  if (accessToken) {
    api.defaults.headers[AUTH_HEADER_NAME] = `Bearer ${accessToken}`;
  }
  if (appId) {
    api.defaults.headers[APP_ID_HEADER_NAME] = appId;
  }

  return api;
}
