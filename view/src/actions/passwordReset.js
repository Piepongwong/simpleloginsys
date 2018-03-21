import {PASSWORD_RESET_FAILED, PASSWORD_RESET_SENT} from "../constants"
import axios from "axios"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const passwordResetFailed = (user)=> {
	return {
		type: PASSWORD_RESET_FAILED
	}
}

const passwwordResetSent = (user)=> {
	return {
		type: PASSWORD_RESET_SENT
		}
}

export const passwordReset = (usernameOrEmail)=> {
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/passwordreset`,
			method: 'post',
			data: {
				usernameOrEmail: usernameOrEmail
			}			
		})
		.then((response)=> {
			dispatch(passwwordResetSent())
		}).catch((err)=> {
			dispatch(passwordResetFailed())
		})
	}
}