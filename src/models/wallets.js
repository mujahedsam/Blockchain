var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var walletschema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	walletname: {
		type: String
	},
	wpassword:{
	 	type: String
	}
});

var Wallets = module.exports = mongoose.model('Wallets', walletschema);