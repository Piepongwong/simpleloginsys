import {INVALID_EMAIL} from "../constants"
import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const invalidEmail = (valid)=> {
	return {
		type: INVALID_EMAIL,
		valid
	}
}

export const emailCheck = (email)=> {
	return dispatch => {
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/user/exists`,
			method: 'post',
			data: {
				usernameOrEmail: email
			}
		})
		.then((response)=> {
			console.log("hiii")
			dispatch(invalidEmail(false))
		}).catch((err)=> {
			dispatch(invalidEmail(true))
		})
	}
}

