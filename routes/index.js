const model = require("../models/index")
model.init()
const passport = require('passport');
const router = require("express").Router()

const checkAuthorized = function(req, res, next) {
	if(req.session.passport) next()
	else res.status(403).send("Unauthorized") 
}

module.exports = (app) => {
	app.post('/login',
	  passport.authenticate('local'), (req, res)=> {
	  		console.log("User logged in")
	  		res.json(req.user)
	  }
	)	
	app.use(require("./user/create"))
	app.use(require("./user/exists"))
	app.use(require("./user/fblogincreate"))
	app.use(require("./user/logout"))
/*	app.use(require("./user/messages"), checkAuthorized) //implement
*/


}
