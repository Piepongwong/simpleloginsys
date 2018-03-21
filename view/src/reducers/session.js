import {AUTHORIZE, INVALID_LOGIN,LOGGED_IN,LOGGED_OUT } from "../constants"

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

export default session