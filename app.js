require("dotenv").config()
const express = require("express"),
  app = express(),
  {Pool} = require("pg"),
  bodyParser = require('body-parser'),
  model = require("./models/index"),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  cors = require('cors')

app.use(cors())

passport.use(new LocalStrategy(
  function(username, password, done) {
  	model.user.login(username, password)
  	.then((lres)=> {
  		if(lres) return done(null, lres)
  		else if(!lres) return done(null, false, {message: "incorrect credentials"})
  	})
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(err, user);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

app.set("PORT", process.env.WEBSERVERPORT)

app.post('/login',
  passport.authenticate('local'), (req, res)=> {
  		res.json(req.user)
  }
)

require("./routes/index")(app)


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.listen(app.get("PORT"), ()=> {
	console.log("Listening at", app.get("PORT"))
})

module.export = app