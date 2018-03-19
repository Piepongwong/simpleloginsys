const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/exists", (req, res)=> {
	model.user.exists(req.body.usernameOrEmail)
	.then((eres)=> {
		eres? res.status(401).send("Username or email already exists"):
		res.status(200).send("Username or email available") 
	})
}) 

module.exports = router