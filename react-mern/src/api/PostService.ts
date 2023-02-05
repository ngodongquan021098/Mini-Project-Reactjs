import { API_PATH } from '../constant/api';
import axios from './middlewareAxios';
import { AxiosResponse } from 'axios';
import { Pagination } from '@/store/posts/reducer';

export interface DataPostNew {
  title: string;
  description: string;
  url: string;
  status: string;
}
export interface DataPostEdit extends DataPostNew {
  _id: string;
}
export interface DataPagination {
  page: number;
  limit: number;
}
export const getListPost = (pagination: Pagination): Promise<AxiosResponse<any, any>> => {
  return axios.get(
    API_PATH.GET_LIST_POSTS(pagination.page, pagination.limit)
    // {
    //   transformResponse: [
    //     (response) => {
    //       let data = JSON.parse(response);
    //       return data;
    //     },
    //   ],
    // }
  );
};

export const addNewPost = (data: DataPostNew): Promise<AxiosResponse<any, any>> => {
  return axios.post(API_PATH.ADD_POST, data);
};

export const deletePost = (data: string): Promise<AxiosResponse<any, any>> => {
  return axios.delete(API_PATH.DELETE_POST(data));
};

export const editPost = (data: DataPostEdit): Promise<AxiosResponse<any, any>> => {
  return axios.put(API_PATH.EDIT_POST(data._id), data);
};
