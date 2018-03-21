import {PASSWORD_CHANGE} from "../constants"
import axios from "axios"
import { push} from 'react-router-redux'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const passwordChange = (success)=> {
	return {
		type: PASSWORD_CHANGE,
		success  //boolean
	}
}

export const changePassword = (password, token)=> {
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/checkpasswordreset`,
			method: 'post',
			data: {
				password,
				token
			}			
		})
		.then((response)=> {
			dispatch(passwordChange(true))
			dispatch(push("/login"))			
		}).catch((err)=> {
			dispatch(passwordChange(false))
		})
	}
}