import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import {Login} from "./components/Login"
import {Signup} from "./components/Signup"
import Profile from "./components/Profile"
import {PrivateRoute} from "./components/PrivateRoute"
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, combineReducers} from "redux"
import rootReducer from "./reducers/root"
import {isAuthenticating, authorize, authorizeFB} from "./actions/root"
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import User from "./components/User"
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const middleware = routerMiddleware(history)

let store = createStore(
	rootReducer,
	applyMiddleware(
    	thunkMiddleware,
    	middleware
    )
)


store.subscribe(()=> {
	console.log(store.getState())
})


const Hi = () => (
		<h1> Hiiiiiii </h1>
	)
ReactDOM.render(
	<Provider store={store}>
	<Router>
		<ConnectedRouter history={history}>
			<div>
	     		 <Route exact path="/" component={App} />
	     		 <Route exact path="/login" component={Login} />
	     		 <Route exact path="/signup" component={Signup} />
	     		 <PrivateRoute path="/profile" component={Profile} />
	     	</div>	 
    	</ConnectedRouter>
    </Router>	
	</Provider>, document.getElementById('root'));
registerServiceWorker();
