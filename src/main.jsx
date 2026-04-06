import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { PlaylistProvider } from './context/PlaylistContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff6f61' },
    secondary: { main: '#4dd0e1' },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AuthProvider>
          <DataProvider>
            <PlaylistProvider>
              <App />
              <Toaster position="top-right" />
            </PlaylistProvider>
          </DataProvider>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
