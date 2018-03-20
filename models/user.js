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
				    id serial primary key NOT NULL,
				    fbid bigint UNIQUE;
				)`
				)
				.catch((err)=> {
					throw err
				})					
			}
		})(pool),
		exists: (function(pool){
			return function(usernameOrEmail) {
				console.log("Check username/email availability", usernameOrEmail)
				return pool.query(`SELECT * FROM users WHERE username = '${usernameOrEmail}' OR email = '${usernameOrEmail}';`)
				.then((pres)=> {
					console.log(pres.rows)
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
								return res.rows[0]
							})
							.catch((err)=> {
								throw err
							})
						})		
					}).catch((err)=> {
						throw err
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
		})(pool),
		fblogin: (function(pool){
			return function(facebookInfo) {
				console.log("Logging in with fb-credentials", facebookInfo)
				return pool.query(`WITH user_row AS (
						INSERT INTO users (firstname, lastname, email, fbid) 
						SELECT '${facebookInfo.first_name}', '${facebookInfo.last_name}', '${facebookInfo.email}', '${facebookInfo.id}'
						WHERE NOT EXISTS (SELECT * FROM users WHERE fbid = ${facebookInfo.id})
						RETURNING *
						)
						SELECT id, username, firstname, lastname, email FROM user_row
						UNION
						SELECT id, username, firstname, lastname, email  FROM users WHERE fbid = ${facebookInfo.id}`)
				.then((pres)=> {
					console.log(pres.rows)
					return pres.rows[0]
				})
				.catch((err)=> {
					console.log(err)
				})
			}
		})(pool),
		count: (function(pool){
					return function(facebookInfo) {
						return pool.query(`SELECT COUNT(*) FROM users;`)
						.then((pres)=> {
							console.log(pres.rows)
							return pres.rows[0]
						})
						.catch((err)=> {
							console.log(err)
						})
					}
				})(pool)		
	}
}


