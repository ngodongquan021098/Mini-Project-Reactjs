import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Button, ThemeProvider, Typography } from '@mui/material';
import customStyle from '../../styles/useStyles';
import clsx from 'clsx';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserName } from '../../utils/common';
import { HomeContext } from '../../hooks/pages/useHome';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constant/path';

const Navigation = (): JSX.Element => {
  const { useStyles, theme } = customStyle;
  const classes = useStyles();
  const userName: string | null = getUserName();
  const homeContextReceived = React.useContext(HomeContext);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <nav className='fixed flex justify-between items-center top-0 h-14 z-[100] w-full bg-[#7BC2B1] pl-5 pr-5 min-w-[800px]'>
        <div className='w-auto flex items-center'>
          <FontAwesomeIcon icon={faCode} inverse className='w-8 h-8' />
          <Typography
            className={clsx(classes.titleNavbar, 'pl-5 text-white font-bold')}
            fontWeight={700}
          >
            Learning IT
          </Typography>
        </div>

        <div className='flex-1 ml-10 hidden w-auto md:block'>
          <ul className='flex flex-col md:flex-row md:items-center '>
            <li className='text-xl text-white cursor-pointer'>Home</li>
            <li className='text-xl text-white cursor-pointer pl-5'>About</li>
            <li
              onClick={(): void => navigate(PATH.MINI_GAME)}
              className='text-xl text-white cursor-pointer pl-5'
            >
              Mini game
            </li>
          </ul>
        </div>

        <div className='flex items-center'>
          <p className='text-white text-base md:pr-3'>Welcome {userName}</p>
          <Button
            onClick={homeContextReceived.handleOpenDialog}
            // add style text
            style={{
              color: '#FFF',
            }}
            // custom bacgkround
            color='orange'
            variant='contained'
            startIcon={<LogoutIcon fontSize={'large'} />}
          >
            Logout
          </Button>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navigation;
