import { fork } from 'redux-saga/effects';
import loginSaga from './login/operations';
import postSaga from './posts/operations';

export default function* rootSaga() {
  yield fork(postSaga);
  yield fork(loginSaga);
}
