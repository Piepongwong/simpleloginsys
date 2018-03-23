# Simple log in system with React and nodeJs

This is a log in system build with express, postgresql, nodemailer, react, reactstrap, redux and react-router v4. It includes email checking, username checking and a forgot password option. I included some chartjs graphs to spice up the design, but they are not connected to the database. Here is a [running example](https://simplelogin.tech-savvy.tech/)

## Setup 
To run first install postgresql and the npm dependencies. Afterwards *two* .env files need to be created. One in the root directory and one in the view directory. The .env file in the root directory needs the following variables:
```
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
WEBSERVERPORT=
FBAPPSECRET=
FBAPPID=
BASEURL=
REACTAPPBASEURL=
ENVIRONMENT=
EMAIL=
EMAILPASSWORD=
JWTSECRET=
EMAILHOST=
EMAILPORT=
```
If `ENVIRONMENT` is set to PRODUCTION, the react ui is served by the express server instead of by a separate dev server. The static build is located in: /view/build/index.html. Go to [Facebook for Developers](https://developers.facebook.com/) to get an App-id and an Appsecret. Make sure to add the domain on which this app is hosted. If you are running this app locally, make sure to pair the domain to your local ip address. Otherwise FB will deny access. Example:

```
/etc/hosts  
127.0.0.1 example.domain.com 
```

The second .env file should be in the view directory. It needs the following variable:

`REACT_APP_BASE_URL=  
`

This is the url that the express server is listening on. It should include the port if it differs from 80.

## Run
Your can run the react app and the backend locally by running `npm start-all` in the root directory. You can also run them separate by running npm start in their respective directories. Set ENVIRONMENT to production, run npm build in /view and use pm2 or any other process manager to run the app in production.