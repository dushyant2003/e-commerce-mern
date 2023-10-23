import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap"
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);
reportWebVitals();