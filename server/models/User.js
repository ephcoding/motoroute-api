const mongoose = require("mongoose");

const MDBUserSchema = new mongoose.Schema({
	name: String,
	email: String
});

module.exports = mongoose.model({'UserModel', MDBUserSchema})