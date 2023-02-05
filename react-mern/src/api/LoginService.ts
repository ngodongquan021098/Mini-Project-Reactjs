import { API_PATH } from '../constant/api';
import { IFormLogin } from '@/hooks/pages/useLogin';
import axios from './middlewareAxios';
import { AxiosResponse } from 'axios';

export const postLogin = (data: IFormLogin): Promise<AxiosResponse<any, any>> => {
  return axios.post(API_PATH.LOGIN, data, {
    transformResponse: [
      (response) => {
        const data = {
          ...JSON.parse(response),
        };
        return data;
      },
    ],
    responseType: 'json',
  });
};
