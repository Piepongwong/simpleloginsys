const express = require('express');
const router = express.Router();

router.get('/user/logout', function(req, res){
  req.logout();
  console.log("Logging out")
  res.status(200).send("logged out")
});

module.exports = router