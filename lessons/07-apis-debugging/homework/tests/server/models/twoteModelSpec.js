require('./../../../app'); // to connect to the database
 // Setup our assertion library
var expect = require('chai').expect;
var mongoose = require('mongoose');

var Twote = require('./../../../models/twoteModel');

describe('Twote Model', function() {

 	 it('should create a new twote', function(done) {

 		var twote = new Twote({
 			text: 'Cheese',
 			user: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
 		});

 		twote.save(function(err){
 			if (err){
 				return done(err);
 			} else {
 				done();
 			}
 		});
 	});

	it('should remove all ingredients', function(done) {
 		Twote.findOneAndRemove({text: 'Cheese'},function(err,removed) {
 			if (err) {
 				return done(err);
 			}
 			if (removed == null) {
 				return done("no object found to remove!");
 			}
 			done();
 		});
	});

});

/* Structurally, this looks good to me! I like that your describe(...) includes an it(...)
   for adding an object and an it(...) for removing the same object... it's generally good practice
   for a test to "clean up after itself" -- leave the database unmodified.

   With that in mind -- I think I might not have picked "Cheese" as the name of the ingredient
   to try saving... seems reasonably likely that an ingredient by that name might already
   exist in whatever database you're hooked up to, and you might end up deleting both the existing one
   and the new one with your Ingredient.remove(...) call. Fortunately it doesn't really matter whether the name
   of the ingredient you're trying to save makes semantic sense in the context of a burger restaurant or not...
   so, here's what I've seen people do in cases like this: come up with some long, fairly-likely-to-be-unique
   string using the current unix epoch time, or a random number generator, or both combined. Not a big deal in
   this context, but safer in production.
*/
