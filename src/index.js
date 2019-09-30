import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import { reducer } from "./reducer"
import thunk from 'redux-thunk'
import { Provider } from "react-redux"
import Axios from "axios"
import { getcurrentuser } from "./actioncreator/index"
const Store = createStore(reducer, applyMiddleware(thunk))
if (localStorage.token) {
    Axios.defaults.headers.common["Authorization"] = localStorage.token
}
Store.dispatch(getcurrentuser())
ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
