require("dotenv").config()
const express = require("express"),
 app = express(),
 {Pool} = require("pg"),
 bodyParser = require('body-parser')

/*const controllers = require("./controllers/index")(pool)
*/
app.use(bodyParser.urlencoded({ extended: false }))
app.set("PORT", 3008)


app.use("/admin", function (req, res, next) {
  res.status(403).send("Oeps, it seems you do not belong here")
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.listen(app.get("PORT"), ()=> {
	console.log("Listening at", app.get("PORT"))
})

