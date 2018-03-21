import { INVALID_USERNAME, INVALID_EMAIL, } from "../constants"


function signUp(	
	state = {
		invalidUsername: false,
		invalidEmail: false
	},
	action) {
	switch(action.type) {
		case INVALID_USERNAME:
			return Object.assign({}, {invalidUsername: action.valid})
		case INVALID_EMAIL:
			return Object.assign({}, {invalidEmail: action.valid})
		default:
			return state
	}

}

export default signUp