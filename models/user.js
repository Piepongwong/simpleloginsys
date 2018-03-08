var bcrypt = require('bcrypt');

module.exports = (pool)=> {
	
	return {
		init: (function(pool) {
			console.log("User model initialized")
			return ()=> {
				pool.query(`CREATE TABLE IF NOT EXISTS public.users
				(
				    username text COLLATE pg_catalog."default",
				    firstname text COLLATE pg_catalog."default",
				    lastname text COLLATE pg_catalog."default",
				    email text COLLATE pg_catalog."default",
				    password text COLLATE pg_catalog."default",
				    id serial primary key NOT NULL
				)`
				)
				.catch((err)=> {
					throw err
				})					
			}
		})(pool),
		exists: (function(pool){
			return function(usernameOrEmail) {
				return pool.query(`SELECT * FROM users WHERE username = '${usernameOrEmail}' OR email = '${usernameOrEmail}';`)
				.then((pres)=> {
					if(pres.rows.length > 0) return true
					else return false
				})
			}
		})(pool),
		create: (function(pool){
				return function(username, firstname, lastname, email, password){
					if(arguments.length < 5) throw "Too few arguments"
					return pool.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}';`)
					.then((pres)=> {
						if(pres.rows.length > 0) return false
						return bcrypt.hash(password, 10).then((hash)=> {
							return pool.query(`INSERT INTO users (username, firstname, lastname, email, password) 
								VALUES('${username}', '${firstname}', '${lastname}', '${email}', '${hash}') 
								RETURNING *;`
							).then((res)=> {
								delete res.rows[0].password
								return res
							})
							.catch((err)=> {
								throw err
							})
						})		
					}).catch((err)=> {
						console.log(err)
					})			
			}
		})(pool),
		login: (function(pool) {
				return function(usernameOrEmail, password) {
					return pool.query(`SELECT * FROM users WHERE username = '${usernameOrEmail}' OR email = '${usernameOrEmail}';`)
						.then((pres)=> {
							if(pres.rows.length === 0) return false
							return bcrypt.compare(password, pres.rows[0].password)
							.then((bres)=> {
								if(bres) {
									delete pres.rows[0].password
									return pres.rows[0]
								} else {
									return bres
								}
							})
						})
				}	
		})(pool)
	}
}