import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { ApiHandledError } from './models/api-handled-error';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // validateStatus: function (status: number) {
  //   return status < 500;
  // },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // temporary if
    if (error.response?.status !== 404 && error.response) {
      const msg = (error.response?.data as ApiHandledError).message;
      toast.error(
        `${error.response?.status} - ${msg ? msg : error.response?.statusText}`
      );
    }

    return Promise.reject(error);
  }
);
