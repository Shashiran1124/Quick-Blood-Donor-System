const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeSchema = new Schema({
	bloodType: {
		type: String,
		required: true,
		enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
	},

	count: {
		type: Number,
		required: true,
		min: 0,
	},

	lastUpdated: {
		type: Date,
		default: Date.now,
	},
});

const HospitalBloodTypeInventory = mongoose.model("HospitalBloodTypeInventory", typeSchema);

module.exports = HospitalBloodTypeInventory;
