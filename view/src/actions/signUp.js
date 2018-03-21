import {INVALID_LOGIN, LOGGED_IN, AUTHORIZE} from "../constants"
import { push} from 'react-router-redux'
import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const invalidLogin = ()=> {
	return {
		type: INVALID_LOGIN
	}
}
const loggedIn = (user)=> {
	return {
		type: LOGGED_IN,
		user: user
	}
}
const  isAuthenticating = ()=> {
	return {
		type: AUTHORIZE
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