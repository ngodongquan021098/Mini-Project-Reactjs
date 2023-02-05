import React from 'react';
import { Outlet } from 'react-router-dom';
import AlertDialog from '../atoms/dialog';
import Navigation from '../atoms/navbar';
import { useHome, HomeContext } from '../../hooks/pages/useHome';

const Home = (): React.ReactElement => {
  const {
    state: { isOpenDialogLogout, handleOpenDialog, handleConfirmLogout, handleCloseDialog },
  } = useHome();
  return (
    <HomeContext.Provider
      value={{
        handleOpenDialog,
      }}
    >
      <div className='w-full'>
        <Navigation></Navigation>
        <div className='mt-20'>
          <Outlet></Outlet>
        </div>

        {/* dialog logout */}
        {isOpenDialogLogout && (
          <AlertDialog
            title={'Confirm Logout'}
            message={'Are you sure to want to logout?'}
            textOk={'Ok'}
            textCancel={'Cancel'}
            handleOk={handleConfirmLogout}
            handleClose={handleCloseDialog}
          ></AlertDialog>
        )}
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
