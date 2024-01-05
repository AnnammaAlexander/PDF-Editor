import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from '@material-tailwind/react';
import './index.css'
import { Provider } from 'react-redux';
import store from './assets/redux/store.ts';
// import { Provider } from 'react-redux';
// import store from './assets/redux/store.ts';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000} />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
