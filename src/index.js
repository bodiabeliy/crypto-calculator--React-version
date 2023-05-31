import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from './redux/store'
import {BrowserRouter, HashRouter} from "react-router-dom";
import './assets/fonts/FuturaPT-Bold.woff2';
import './assets/fonts/FuturaPT-Demi.woff2';
import './assets/fonts/FuturaPT-Medium.woff2';
import './index.css';
import './App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Provider store={store}>
             <App/>
        </Provider>
    </HashRouter>
);
