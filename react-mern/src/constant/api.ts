const baseUrl = 'http://localhost:5000/api';
export const API_PATH = {
  LOGIN: `${baseUrl}/auth/login`,
  GET_LIST_POSTS: (page: number, limit: number) =>
    `${baseUrl}/post/get?page=${page}&limit=${limit}`,
  ADD_POST: `${baseUrl}/post/create`,
  DELETE_POST: (id: string) => `${baseUrl}/post/${id}`,
  EDIT_POST: (id: string) => `${baseUrl}/post/${id}/update`,
};
