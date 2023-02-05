import { DataPagination, DataPostEdit, DataPostNew } from '@/api/PostService';
import { createAction } from '@reduxjs/toolkit';
import { ACTION_POSTS } from './const';
import { PostSlice } from './reducer';

export const getListPostActions = createAction<DataPagination>(ACTION_POSTS.GET_LIST_POSTS);
export const addPostActions = createAction<DataPostNew>(ACTION_POSTS.ADD_NEW_POST);
export const deletePostActions = createAction<string>(ACTION_POSTS.DELETE_POST);
export const editPostActions = createAction<DataPostEdit>(ACTION_POSTS.EDIT_POST);

export const { setListPosts, setPagination } = PostSlice.actions;
