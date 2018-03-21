import { PASSWORD_RESET_SENT, PASSWORD_RESET_FAILED, PASSWORD_CHANGE} from "../constants"

function passwordReset(	
	state = {
		passwordResetSent: false,
		passwordResetFailed: false,
		success: true
	},
	action) {
	switch(action.type) {
		case PASSWORD_RESET_FAILED:
			return Object.assign({}, {passwordResetFailed: true})
		case PASSWORD_RESET_FAILED:
			return Object.assign({}, {success: action.success})			
		case PASSWORD_RESET_SENT:
			return Object.assign({}, {passwordResetSent: true, passwordResetFailed: false})
		default:
			return state
	}
}

export default passwordReset