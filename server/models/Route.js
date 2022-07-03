const mongoose = require("mongoose");

const CoordinatesSchema = new mongoose.Schema({
	latitude: Number,
	longitude: Number,
});

const PointSchema = new mongoose.Schema({
	coords: CoordinatesSchema,
	accuracy: Number,
	altitude: Number,
	heading: Number,
	speed: Number,
	timestamp: String,
});

const MDBRouteSchema = new mongoose.Schema({
	// creates reference to UserModel
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "UserModel",
	},
	name: String,
	status: {
		type: String,
		enum: ["New", "Paused", "Completed"],
	},
	points: [PointSchema],
});

module.exports = mongoose.model("RouteModel", MDBRouteSchema);
