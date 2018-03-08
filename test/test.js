var request = require('request');
require("dotenv").config({path: "../.env"})
require("../app.js")
var assert = require('assert');
describe('Routes', function() {
  describe('profile', function() {
    it('should return 403', function(done) {
    	request(`http://localhost/${process.env.WEBSERVERPORT}`, (err, response, body)=> {
    	   assert.equal(response.statusCode, 404);
    	   done()
    	})
    });
  });
});