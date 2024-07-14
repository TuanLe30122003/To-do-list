import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyle';
import { ThemeProvider } from './context/themeContexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

