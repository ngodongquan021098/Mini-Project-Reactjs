import { postLogin } from '../../api/LoginService';
import { StateActionLogin } from '@/hooks/pages/useLogin';
import { call, takeEvery } from 'redux-saga/effects';
import { ACTIONS_LOGIN } from './const';
import {
  showToast,
  ReponseSaga,
  ResponseSagaLogin,
  TypeToast,
  saveDataUser,
} from '../../utils/common';

type Params = {
  type: string;
  payload: StateActionLogin;
};
function* handleAuth(data: Params) {
  try {
    const dataRequest = {
      username: data.payload.username,
      password: data.payload.password,
    };
    const result: ResponseSagaLogin = yield call(postLogin, dataRequest);
    saveDataUser({
      accessToken: result.response.accessToken,
      username: result.response.username,
    });
    showToast(TypeToast['success'], 'Login successfully');
    data.payload.navigate('/');
  } catch (error) {
    const err = error as ReponseSaga;
    showToast(TypeToast['error'], err.response.message);
  }
}
export default function* loginSaga() {
  yield takeEvery(ACTIONS_LOGIN.LOGIN, handleAuth);
}
