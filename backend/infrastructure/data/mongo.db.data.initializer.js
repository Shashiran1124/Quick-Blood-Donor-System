const HospitalBloodTypeInventory = require("../../models/HospitalBloodTypeInventory");
const logger = require("../../utils/logger");

const seedDatabaseAsync = async () => {
	try {
		await seedHospitalBloodTypeInventoryAsync();
	} catch (error) {
		logger.error("Error seeding data:", error);
	}
};

const seedHospitalBloodTypeInventoryAsync = async () => {
	try {
		const booldTypes = [
			{ bloodType: "A+", count: 0 },
			{ bloodType: "A-", count: 0 },
			{ bloodType: "B+", count: 0 },
			{ bloodType: "B-", count: 0 },
			{ bloodType: "AB+", count: 0 },
			{ bloodType: "AB-", count: 0 },
			{ bloodType: "O+", count: 0 },
			{ bloodType: "O-", count: 0 },
		];

		if ((await HospitalBloodTypeInventory.countDocuments()) === 0) {
			await HospitalBloodTypeInventory.insertMany(booldTypes);
			logger.info("Data seeded successfully");
		}
	} catch (error) {
		logger.info(error);
	}
};

module.exports = {
	seedDatabaseAsync,
};
