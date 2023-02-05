import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingIndicator from './components/atoms/loading';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: undefined },
          style: {
            fontFamily: 'Montserrat',
          },
        },
      ],
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode> // render app two times in local not in productions
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>

      {/* Services */}
      <ToastContainer></ToastContainer>
      <LoadingIndicator></LoadingIndicator>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
