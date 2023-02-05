import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from '../utils/common';

axios.defaults.transformResponse = [
  function (data) {
    let response = JSON.parse(data);
    return response;
  },
];

axios.interceptors.request.use(
  function (config) {
    document.getElementById('loading-indicator')?.classList.toggle('invisible');
    // config headers
    if (config.headers) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken();
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // dispatch(actionsLogin());
    document.getElementById('loading-indicator')?.classList.toggle('invisible');
    return Promise.resolve({
      response: response.data,
      status: response.status,
    }) as unknown as AxiosResponse<any, any>;
  },
  function (error) {
    // Do something with response error
    document.getElementById('loading-indicator')?.classList.toggle('invisible');
    return Promise.reject({
      response: error.response.data,
      status: error.response.status,
    });
  }
);

export default axios;
