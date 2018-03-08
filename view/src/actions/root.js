import {AUTHORIZE, IS_AUTHENTICATING, INVALID_LOGIN, LOGGED_IN} from "../constants"
import axios from "axios"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const isAuthenticating = ()=> {
	return {
		type: AUTHORIZE
	}
}

export const invalidLogin = ()=> {
	return {
		type: INVALID_LOGIN
	}
}

export const loggedIn = (user)=> {
	return {
		type: LOGGED_IN,
		user: user
	}
}

export const authorize = ()=> {
	return dispatch => {
		dispatch(isAuthenticating())
		return axios({
			url: 'http://localhost:3010/user/login',
			method: 'post',
			data: {
			usernameOrEmail: 'wongpong',
			password: '12345'
			}
		})
		.then((response)=> {
			dispatch(loggedIn(response.data))
		}).catch((err)=> {
			dispatch(invalidLogin())
		})
	}
}