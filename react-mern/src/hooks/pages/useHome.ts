import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionsLogout } from '../../store/login/actions';

type useHomeState = {
  isOpenDialogLogout: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
  handleConfirmLogout: () => void;
};

interface HomeContextData {
  handleOpenDialog: () => void;
}

export const HomeContext = React.createContext<HomeContextData>({
  handleOpenDialog: () => {},
});

export const useHome = (): { state: useHomeState } => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDialogLogout, setIsOpenDialogLogout] = React.useState<boolean>(false);
  const handleOpenDialog = (): void => {
    setIsOpenDialogLogout(true);
  };
  const handleCloseDialog = (): void => {
    setIsOpenDialogLogout(false);
  };
  const handleConfirmLogout = (): void => {
    localStorage.removeItem('accessToken');
    dispatch(actionsLogout());
    navigate('/login');
  };
  return {
    state: {
      isOpenDialogLogout,
      handleOpenDialog,
      handleCloseDialog,
      handleConfirmLogout,
    },
  };
};
