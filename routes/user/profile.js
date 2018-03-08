const express = require('express');
const router = express.Router();

router.get("/user/profile", (req, res)=> {
	console.log(req.session.passport.user)
	res.send("hi")
})

module.exports = router