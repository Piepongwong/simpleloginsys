const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/passwordreset", (req, res)=> {
	model.user.sendPasswordReset(req.body.usernameOrEmail)
	.catch((err)=> {
		console.log(err)
	})
	res.status(200).send("password reset") // the user is intentionally not notified if the email or username do not exists
})

module.exports = router