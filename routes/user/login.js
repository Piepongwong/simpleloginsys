/* Not Used Local Passport STrategy is used instead */
const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/login", (req, res)=> {
	console.log(req.body.password)
	if(req.body.usernameOrEmail == null || req.body.password == null) {
		res.status(401).send("invalid credentials")
		return
	}
	model.user.login(req.body.usernameOrEmail, req.body.password)
	.then((lres)=> {
		if(lres) {
			res.status(200).json(lres)
		} else {
			res.status(401).send("wrong credentials")
		}
	})
})

module.exports = router
