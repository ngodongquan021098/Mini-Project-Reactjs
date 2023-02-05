import { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actionsLogin } from '../../store/login/actions';
import { useNavigate, NavigateFunction } from 'react-router-dom';

export interface IFormLogin {
  username: string;
  password: string;
}

export interface StateActionLogin extends IFormLogin {
  navigate: NavigateFunction;
}
type LoginState = {
  state: {
    handleSubmitForm: SubmitHandler<IFormLogin>;
  };
};
export const useLogin = (): LoginState => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitForm: SubmitHandler<IFormLogin> = (data: IFormLogin): void => {
    dispatch(actionsLogin({ ...data, navigate }));
  };

  return {
    state: {
      handleSubmitForm,
    },
  };
};
