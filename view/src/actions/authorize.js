import {LOGGED_IN, AUTHORIZE, INVALID_LOGIN} from "../constants"
import { push} from 'react-router-redux'
import axios from "axios"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const loggedIn = (user)=> {
	return {
		type: LOGGED_IN,
		user: user
	}
}

export const invalidLogin = ()=> {
	return {
		type: INVALID_LOGIN
	}
}

export const isAuthenticating = ()=> {
	return {
		type: AUTHORIZE
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