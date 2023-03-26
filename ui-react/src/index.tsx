import ReactDOM from 'react-dom/client';

import './index.scss';
import { StrictMode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';
import { LanguageContextProvider } from './context/LanguageContext';
import { ColorModeContextProvider } from './context/ColorModeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageContextProvider>
        <ColorModeContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
            <ToastContainer pauseOnFocusLoss={true} theme={'colored'} />
          </BrowserRouter>
        </ColorModeContextProvider>
      </LanguageContextProvider>
    </QueryClientProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
