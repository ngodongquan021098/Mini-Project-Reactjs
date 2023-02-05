import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PostSlice } from './posts/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { ACTIONS_LOGIN } from './login/const';

const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  posts: PostSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === ACTIONS_LOGIN.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
