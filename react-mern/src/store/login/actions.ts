import { createAction } from '@reduxjs/toolkit';
import { StateActionLogin } from '@/hooks/pages/useLogin';
import { ACTIONS_LOGIN } from './const';

export const actionsLogin = createAction<StateActionLogin>(ACTIONS_LOGIN.LOGIN);
export const actionsLogout = createAction(ACTIONS_LOGIN.LOGOUT);
