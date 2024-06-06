import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Header} from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import {BrowserRouter} from "react-router-dom";

import Contact from "./pages/contact/Contact";
import {Manager} from "./admin/Admin";
import Forgot from "./pages/forgot/Forgot";
import ForgotConfirm from "./pages/forgotConfirm/ForgotConfirm";
import Register from "./pages/register/Register";
import AccountDetailsScreen from "./pages/accountDetail/AccountDetailsScreen";
import {Home} from "./pages/homeScreen/Home";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    {/*<App />*/}
      <BrowserRouter>
          <App />
      </BrowserRouter>
    {/*  <Manager/>*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
