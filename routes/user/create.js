const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/create", (req, res)=> {
	model.user.create(req.body.username, req.body.firstname,req.body.lastname, req.body.email, req.body.password)
	.then((ures)=> {
		if(ures) {
			console.log("Created user", ures)
			res.status(201).json(ures)
		} else {
			res.status(406).send("User already exists")
		}
	})
})

module.exports = router