import {combineReducers} from "redux"
import {AUTHORIZE, INVALID_LOGIN, LOGGED_IN} from "../constants"

const root = combineReducers({
	session,
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
			return Object.assign({}, state, {invalidLogin: true})
		case LOGGED_IN: 
			return Object.assign({}, state, action.user, {invalidLogin: false, isAuthorizing: false, isLoggedIn: true})
		default:
			return state
	}
}

