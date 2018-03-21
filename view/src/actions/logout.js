import {LOGGED_OUT} from "../constants"
import axios from "axios"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const loggedOut = ()=> {
	return {
		type: LOGGED_OUT
	}
}

export const logout = ()=> {
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/logout`,
			method: 'get'
		})
		.then((response)=> {
			dispatch(loggedOut())
		}).catch((err)=> {
			console.log("logging out failed")
		})
	}
}