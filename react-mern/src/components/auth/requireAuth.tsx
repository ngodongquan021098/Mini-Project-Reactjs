import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/common';
import { PATH } from '../../constant/path';

type Props = {
  path: string;
  children: JSX.Element;
};
const ConfigRouteAuth: React.FC<Props> = ({ children, path }: Props) => {
  const accessToken = getAccessToken();
  if (path === PATH.LOGIN) {
    return accessToken ? <Navigate to={'..'}></Navigate> : children;
  }
  return accessToken ? children : <Navigate to={PATH.LOGIN}></Navigate>;
};

export default ConfigRouteAuth;
