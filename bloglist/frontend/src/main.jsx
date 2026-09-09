import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDom.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);