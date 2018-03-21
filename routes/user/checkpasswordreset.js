const express = require('express');
const router = express.Router();
const model = require("../../models/index")
	
router.post("/user/checkpasswordreset", (req, res)=> {
	model.user.checkPasswordReset(req.body.token, req.body.password)
	res.status(200).send("password reset")
})

module.exports = router