import { AxiosRequestConfig } from 'axios';
import { BASE_API_SERVER_URL } from '../environments';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_API_SERVER_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
};
