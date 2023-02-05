import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const state = (state: RootState) => state;
export const listPostsSelector = createSelector(state, (state) => state.posts.listPosts);
export const paginationSelector = createSelector(state, (state) => state.posts.pagination);
