const fs = require("fs")
module.exports = function(clientOrPool){
	const controller = {}
	fs.readdir("./", (err, data)=> {
		for(let i = 0; i < data.length; i++) {
			if(data[i] != "index.js") {
				controller[data[i]] = require(data[i])(clientOrPool)
			}
		}
	})	

	return controller
}


https://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application


http://peter.michaux.ca/articles/mvc-architecture-for-javascript-applications

https://addyosmani.com/largescalejavascript/