import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ApplicationProvider } from './client/context/ApplicationContext';
import { SnackbarProvider } from './client/context/SnackbarContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </ApplicationProvider>
  </React.StrictMode>,
);
