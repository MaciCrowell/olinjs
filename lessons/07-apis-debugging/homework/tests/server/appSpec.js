var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
	it('should return 200 OK on GET /', function(done) {
		request(app)
		.get('/')
		.expect(200, done); // nicer shorthand if you're not doing anything in the "end"
	});

	it('should return 200 OK on GET /login', function(done) {
		request(app)
		.get('/login')
		.expect(200)
		.end(function(err, res) {
	        // Supertest lets us end tests this way...
	        // (useful if we want to check a couple more things with chai)
	        if (err) {
	        	return done(err);
	        }
	        done();
	    });
	});

	// Completely understand if you don't want to copy-paste a statement a bunch of
	// times to cover all of the routes -- as long as you understand that you probably would
	// do something like that if you were testing an app for production.

	// Probably a good idea to try to trigger a couple of error cases, also.
});
