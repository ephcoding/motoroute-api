const mongoose = require("mongoose");

const connectMongoDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI);

	console.log(
		`>> CONNECTED TO [MongoDB: motoroute_db] <<: ${conn.connection.host}`
	);
};

module.exports = connectMongoDB;
