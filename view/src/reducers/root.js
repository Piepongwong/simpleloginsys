import {combineReducers} from "redux"
import session from "./session"
import signUp from "./signUp"
import passwordReset from "./passwordReset"

const root = combineReducers({
	session,
	signUp,
	passwordReset
})

export default root


