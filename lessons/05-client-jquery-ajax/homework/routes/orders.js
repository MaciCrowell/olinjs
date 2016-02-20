var express = require('express');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');
var router = express.Router();

module.exports = router;

// In general, remove log statements when you push final version of app to "master"
// It is also nice to include the methods of your API as part of a routes = {} object 
// and instantiate the functions as routes.ordersGet = function(){...} and in the
// bottom of your order.js export module.exports = routes

var ordersGET = function(req, res) {
	Order.find({complete: false}).populate('ingredients').exec( function(err, orders) {
		res.render("ordersView", {"orders": orders});
	})
}

var newOrderGET = function(req, res) {
	Ingredient.find().sort("-inStock").exec( function(err, ingredients) {
		console.log(ingredients)
		res.render("newOrderView", {"ingredients": ingredients});
	})
}

var submitOrderPOST = function(req, res) {
	console.log(req.body);
	console.log(req.body['ingredients[]']);
	var newOrder = Order({"name": req.body.name, "total":req.body.total, "ingredients": req.body['ingredients[]']})
	newOrder.save(function (err, newOrder) {
		if (err) return console.error(err)
	});
	res.send(newOrder);
}

var completeOrderPOST = function(req, res) {
	console.log(req.body);
	Order.findById(req.body.id, function (err, order) {
		order.complete = true;
		order.save(function (err, order) {
			if (err) {return console.error(err)} 
			else {res.send(order)}
		});
	});
}

// Your way is nice too, but you get to onlu export once instead of 4 times with the afore-mentioned way.
module.exports.orders = ordersGET;
module.exports.newOrder = newOrderGET;
module.exports.submitOrder = submitOrderPOST;
module.exports.completeOrder = completeOrderPOST;