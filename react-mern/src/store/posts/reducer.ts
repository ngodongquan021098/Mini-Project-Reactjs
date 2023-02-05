import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/utils/common';

export type Pagination = {
  page: number;
  limit: number;
  totalPage?: number;
};
type StatePost = {
  listPosts: Post[];
  pagination: Pagination;
};
const initialState: StatePost = {
  listPosts: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};
export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setListPosts: (state, action: PayloadAction<Post[]>) => {
      state.listPosts = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
  },
});
