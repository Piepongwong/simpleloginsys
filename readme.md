# Simple log in system with Reacct and nodeJs

To run first install postgresql and the npm dependencies. Afterwards 2 .env files need to be created. One in the root directory and 1 in the view directory. The .env file in the root directory needs the following variables:

`PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
WEBSERVERPORT=
FBAPPSECRET=
FBAPPID=
BASEURL=
`

Go [Facebook for Developers](https://developers.facebook.com/) to get an App-id and an Appsecret. Make sure to add the domain on which this app is hosted. If you are running this app locally, make sure to pair the domain to your local ip address. Otherwise fb will deny access. Example:

`/etc/hosts
127.0.0.1 example.domain.com`

The second .env file should be in the view directory. It needs the following variable:

`REACT_APP_BASE_URL=
`

This is the url that the express server is listening on. It should include the port if it differs from 80.