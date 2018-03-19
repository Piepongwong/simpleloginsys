import {AUTHORIZE, IS_AUTHENTICATING, INVALID_LOGIN, LOGGED_IN, INVALID_USERNAME, INVALID_EMAIL, LOGGED_OUT} from "../constants"
import axios from "axios"

import { push} from 'react-router-redux'

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

export const loggedOut = ()=> {
	return {
		type: LOGGED_OUT
	}
}

export const invalidUsername = (valid)=> {
	return {
		type: INVALID_USERNAME,
		valid
	}
}

export const invalidEmail = (valid)=> {
	return {
		type: INVALID_EMAIL,
		valid
	}
}

export const authorize = (usernameOrEmail, password)=> {
	return dispatch => {
		dispatch(isAuthenticating())
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/login`,
			method: 'post',
			data: {
				username: usernameOrEmail,
				password: password
			}
		})
		.then((response)=> {
			dispatch(loggedIn(response.data))
			dispatch(push("/profile"))
		}).catch((err)=> {
			dispatch(invalidLogin())
		})
	}
}

export const authorizeFB = (fbObject)=> {
	return dispatch => {
		dispatch(isAuthenticating())
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/fblogincreate`,
			method: 'post',
			data: {
				first_name: fbObject.first_name,
				last_name: fbObject.last_name,
				email: fbObject.email,
				id: fbObject.id
			}
		})
		.then((response)=> {
			dispatch(loggedIn(response.data))
			dispatch(push("/profile"))
		}).catch((err)=> {
			dispatch(invalidLogin())
		})
	}
}


export const signup = (username, firstname, lastname, email, password)=> {
	return dispatch => {
		dispatch(isAuthenticating())
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/create`,
			method: 'post',
			data: {
				username,
				firstname,
				lastname,
				email,
				password
			}
		})
		.then((response)=> {
			dispatch(loggedIn(response.data))
			dispatch(push("/profile"))
		}).catch((err)=> {
			dispatch(invalidLogin())
		})
	}
}

export const emailCheck = (email)=> {
	console.log("The credentials", email)
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/exists`,
			method: 'post',
			data: {
				usernameOrEmail: email
			}
		})
		.then((response)=> {
			dispatch(invalidEmail(false))
		}).catch((err)=> {
			dispatch(invalidEmail(true))
		})
	}
}

export const usernameCheck = (username)=> {
	console.log("The credentials", username)
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/exists`,
			method: 'post',
			data: {
				usernameOrEmail: username
			}
		})
		.then((response)=> {
			dispatch(invalidUsername(false))
		}).catch((err)=> {
			dispatch(invalidUsername(true))
		})
	}
}

export const logout = ()=> {
	console.log("reached")
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/logout`,
			method: 'get'
		})
		.then((response)=> {
			console.log("reached2")
			dispatch(loggedOut())
		}).catch((err)=> {
			dispatch(invalidUsername(true))
		})
	}
}