import { takeEvery, put, call, select } from 'redux-saga/effects';
import { ACTION_POSTS } from './const';
import {
  addNewPost,
  DataPagination,
  DataPostEdit,
  DataPostNew,
  deletePost,
  editPost,
  getListPost,
} from '../../api/PostService';
import { Post, ReponseSaga, ResponseSagaPosts, showToast, TypeToast } from '@/utils/common';
import { setListPosts, setPagination } from './actions';
import { listPostsSelector } from './selector';

type Params = {
  type: string;
};
type ParamsActionAddNewPost = Params & {
  payload: DataPostNew;
};

type ParamsActionDeletePost = Params & {
  payload: string;
};

type ParamsActionEditPost = Params & {
  payload: DataPostEdit;
};

type ParamsActionGetListPost = Params & {
  payload: DataPagination;
};
function* getListPostsSaga(data: ParamsActionGetListPost) {
  const result: ResponseSagaPosts = yield call(getListPost, data.payload);
  yield put(
    setPagination({
      ...data.payload,
      totalPage: result.response.totalPage,
    })
  );
  const listPost: Post[] = yield select(listPostsSelector);
  const shallowListPost = [...listPost];
  yield put(setListPosts([...shallowListPost, ...result.response.posts]));
}

function* addNewPostSaga(data: ParamsActionAddNewPost) {
  try {
    const result: ReponseSaga & { post: Post } = yield call(addNewPost, data.payload);
    showToast(TypeToast['success'], result.response.message);
    let listPost: Post[] = yield select(listPostsSelector);
    let shallowListPost = [...listPost];
    shallowListPost.push({ ...data.payload, _id: result.response.post._id });
    yield put(setListPosts(shallowListPost));
  } catch (error) {
    const err = error as ReponseSaga;
    showToast(TypeToast['error'], err?.response?.message);
  }
}

function* deletePostSaga(data: ParamsActionDeletePost) {
  try {
    const result: ReponseSaga = yield call(deletePost, data.payload);
    showToast(TypeToast['success'], result.response.message);
    let listPost: Post[] = yield select(listPostsSelector);
    let indexPost = listPost.findIndex((el: Post) => el._id === data.payload);
    if (indexPost > -1) {
      let shallowListPost = [...listPost];
      shallowListPost.splice(indexPost, 1);
      yield put(setListPosts(shallowListPost));
    }
  } catch (error) {
    const err = error as ReponseSaga;
    showToast(TypeToast['error'], err.response.message);
  }
}

function* editPostSaga(data: ParamsActionEditPost) {
  try {
    const result: ReponseSaga = yield call(editPost, data.payload);
    showToast(TypeToast['success'], result.response.message);
    let listPost: Post[] = yield select(listPostsSelector);
    let indexPost = listPost.findIndex((el: Post) => el._id === data.payload._id);
    if (indexPost > -1) {
      let shallowListPost = [...listPost];
      shallowListPost[indexPost] = {
        ...shallowListPost[indexPost],
        ...data.payload,
      };
      yield put(setListPosts(shallowListPost));
    }
  } catch (error) {
    const err = error as ReponseSaga;
    showToast(TypeToast['error'], err?.response?.message);
  }
}

export default function* postSaga() {
  yield takeEvery(ACTION_POSTS.GET_LIST_POSTS, getListPostsSaga);
  yield takeEvery(ACTION_POSTS.ADD_NEW_POST, addNewPostSaga);
  yield takeEvery(ACTION_POSTS.DELETE_POST, deletePostSaga);
  yield takeEvery(ACTION_POSTS.EDIT_POST, editPostSaga);
}
