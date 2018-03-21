import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Login} from "./components/Login"
import {Signup} from "./components/Signup"
import Profile from "./components/Profile"
import {ChooseNewPassword} from "./components/ChooseNewPassword"
import {PrivateRoute} from "./components/PrivateRoute"
import {ResetPassword} from "./components/ResetPassword"
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from "redux"
import rootReducer from "./reducers/root"
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import {loadState, saveState} from "./localStorage"
import {throttle} from "lodash"
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const middleware = routerMiddleware(history)

const loadedState = loadState()
let store = createStore(
	rootReducer,
	loadedState,
	applyMiddleware(
    	thunkMiddleware,
    	middleware
    )
)

store.subscribe(throttle(()=> {
	saveState(store.getState())
}, 1000))

ReactDOM.render(
	<Provider store={store}>
	<Router>
		<ConnectedRouter history={history}>
			<div>
	     		 <Route exact path="/" component={Login} />
	     		 <Route exact path="/login" component={Login} />
	     		 <Route exact path="/signup" component={Signup} />
	     		 <PrivateRoute path="/profile" component={Profile} />
				<Route  path="/choosenewpassword/:token" component={ChooseNewPassword} />	     	
				<Route  path="/resetpassword" component={ResetPassword} />	     		 

	     	</div>	 
    	</ConnectedRouter>
    </Router>	
	</Provider>, document.getElementById('root'));
registerServiceWorker();
