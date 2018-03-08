const model = require("../models/index")
model.init()
const passport = require('passport');
const router = require("express").Router()

const checkAuthorized = function(req, res, next) {
	if(req.session.passport) next()
	else res.status(403).send("Unauthorized") 
}

module.exports = (app) => {
	app.use("/user/profile", checkAuthorized)
	app.use(require("./user/profile"))
	app.use(require("./user/create"))
	app.use(require("./user/login"))
}





/*

https://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application


http://peter.michaux.ca/articles/mvc-architecture-for-javascript-applications

https://addyosmani.com/largescalejavascript/*/