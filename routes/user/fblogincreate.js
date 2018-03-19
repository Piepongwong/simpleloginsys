const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/fblogincreate", (req, res)=> {
	console.log(req.body.first_name)


/*	if(req.body.usernameOrEmail == null || req.body.password == null) {
		res.status(401).send("invalid credentials")
		return
	}*/
	model.user.fblogin({
		first_name: req.body.first_name, 
		last_name: req.body.last_name, 
		id: req.body.id, 
		email: req.body.email})
	.then((lres)=> {
		if(lres) {
			console.log("FB login successfull")
			res.status(200).json(lres)
		} else {
			res.status(401).send("wrong credentials")
		}
	})
})

module.exports = router
