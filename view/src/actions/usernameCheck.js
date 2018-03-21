import {INVALID_USERNAME} from "../constants"
import axios from "axios"

export const invalidUsername = (valid)=> {
	return {
		type: INVALID_USERNAME,
		valid
	}
}

export const usernameCheck = (username)=> {
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