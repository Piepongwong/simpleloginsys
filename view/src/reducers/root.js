import {combineReducers} from "redux"
import {AUTHORIZE, INVALID_LOGIN, LOGGED_IN, INVALID_USERNAME, INVALID_EMAIL, LOGGED_OUT} from "../constants"

const root = combineReducers({
	session,
	signUp
})

export default root

function session (
	state = {
		isLoggedIn: false,
		username: null,
		firstname: null,
		lastname: null,
		email: null,
		isAuthorizing: false,
		invalidLogin: false
	}, 
	action
) {
	switch(action.type) {
		case AUTHORIZE:
			return Object.assign({}, state, {isAuthorizing: true})
		case INVALID_LOGIN:
			return Object.assign({}, state, {invalidLogin: true, isAuthorizing: false})
		case LOGGED_IN: 
			return Object.assign({}, state, action.user, {invalidLogin: false, isAuthorizing: false, isLoggedIn: true})
		case LOGGED_OUT:
			return Object.assign({}, {
				isLoggedIn: false,
				username: null,
				firstname: null,
				lastname: null,
				email: null,
				isAuthorizing: false,
				invalidLogin: false
			})
		default:
			return state
	}
}

function signUp(	
	state = {
		invalidUsername: false,
		invalidEmail: false
	},
	action) {
	switch(action.type) {
		case INVALID_USERNAME:
			return Object.assign({}, {invalidUsername: action.valid})
		case INVALID_EMAIL:
			return Object.assign({}, {invalidEmail: action.valid})
		default:
			return state
	}

}

