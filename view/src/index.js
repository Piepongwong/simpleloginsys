import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from "redux"
import rootReducer from "./reducers/root"
import {isAuthenticating, authorize} from "./actions/root"
import thunkMiddleware from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware
    )
)

store.subscribe(()=> {
	console.log(store.getState())
})
store.dispatch(authorize())

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
