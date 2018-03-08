require("dotenv").config({path: "../.env"})
const fs = require("fs")
const {Pool } = require("pg")
const pool = new Pool() 

let files = fs.readdirSync(__dirname).filter(file => file != "index.js")

const model = {}

for(let i = 0; i < files.length; i++) {
	model[files[i].slice(0, files[i].indexOf("."))] = require(`${__dirname}/${files[i]}`)(pool)
}	

model.init = () => {
			let keys = Object.keys(model).filter((key)=> key != "init")
			for(let i = 0; i < keys.lenght; i++) {
				model[keys[i]].init()
			}
		}

module.exports = model
