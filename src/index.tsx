import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
//import {w3cwebsocket as Websocket} from "websocket";
import './index.css'
//const client = new WebSocket('ws://127.0.0.1:8085');
//import * as serviceWorker from './serviceworker';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// compononentDidMount(){
//   client.onopen = () => {
//     console.log('Websocket Client connected');
//   };
// }

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
