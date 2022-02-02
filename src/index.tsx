import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './styles/global.scss';
import DataProvider from "./context/data";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
