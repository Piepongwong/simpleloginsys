const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.get("/user/count", (req, res)=> {
	model.user.count()
	.then((ures)=> {
		if(ures) {
			console.log("Amount of users", ures)
			res.status(201).json(ures)
		} else {
			res.status(406).send("User already exists")
		}
	})
})

module.exports = router