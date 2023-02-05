import { AxiosResponse } from 'axios';
import { toast, ToastOptions } from 'react-toastify';

type Response = {
  message: string;
  success: boolean;
  [x: string]: any;
};

export type ReponseSaga = {
  status: number;
  response: Response;
};

export type DataUser = {
  accessToken: string;
  username: string;
};

export interface ResponseSagaLogin extends ReponseSaga {
  response: Response & DataUser;
}

export type Post = {
  _id: string;
  title: string;
  description: string;
  url: string;
  status: string;
};

export interface ResponseSagaPosts extends ReponseSaga {
  response: Response & { posts: Post[]; totalPage: number };
}

export const customServiceForSaga = (
  result: Promise<AxiosResponse<any, any>>
): Promise<ReponseSaga> => {
  return new Promise((resolve, reject) => {
    result
      .then((res) => {
        resolve({
          status: res.status,
          response: res.data,
        });
      })
      .catch((err) => {
        reject({
          status: err.response.status,
          response: err.response.data,
        });
      });
  });
};

export enum TypeToast {
  'success',
  'warn',
  'error',
}

export const showToast = (type: TypeToast, message: string): void => {
  const configToast: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };
  if (type === TypeToast['success']) {
    toast.success(message, configToast);
  } else if (type === TypeToast['error']) {
    toast.error(message, configToast);
  } else if (type === TypeToast['warn']) {
    toast.warn(message, configToast);
  }
};

export const saveDataUser = (dataUser: DataUser): void => {
  localStorage.setItem('accessToken', dataUser.accessToken);
  localStorage.setItem('nameUser', dataUser.username);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const getUserName = (): string | null => {
  return localStorage.getItem('nameUser');
};
