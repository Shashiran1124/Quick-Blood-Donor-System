const router = require("express").Router();
const mongoose = require("mongoose");
let HospitalBloodTypeInventory = require("../models/HospitalBloodTypeInventory");
const logger = require("../utils/logger");
const DonorSchema = new mongoose.Schema({});
const Donors = mongoose.models.Donors || mongoose.model("Donors", DonorSchema, "doners");


router.route("/all").get((req, res) => {
	HospitalBloodTypeInventory.find()
		.then((blod) => {
			res.json(blod);
		})

		.catch((error) => {
			logger.error(error);
			res.status(500).send("Server error");
		});
});
router.route("/:id").get((req, res) => {
	const { id } = req.params;
	HospitalBloodTypeInventory.findById(id)
		.then((blood) => {
			if (!blood) {
				return res.status(404).send("id not found");
			}
			res.json(blood);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("server error");
		});
});
router.route("/updateCount").put(async (req, res) => {
	const { id, count } = req.body;
	logger.info(req.body);
	try {
		if (!id || count === undefined) {
			return res.status(400).json({
				isSuccess: false,
				message: "Invalid request. 'id' and 'count' are required.",
			});
		}

		let bloodRecord = await HospitalBloodTypeInventory.findById(id);

		if (!bloodRecord) {
			return res.status(404).json({
				isSuccess: false,
				message: "Record not found.",
			});
		}

		
		if(bloodRecord.count <=5){
			const Btype= bloodRecord.bloodType;
			const neededDonors = await Donors.find({ bloodType: Btype });
			//logger.info(Btype);
            //logger.info(neededDonors);

			const donorLocations = neededDonors.map(donor => `${donor._doc.location.latitude},${donor._doc.location.longitude}`);//annonimus function here it re present paramiter 
			//it re present each doner in neededDoner array
			logger.info(donorLocations);

			//const donorLocations = neededDonors.map((donor)=> {
			//logger.info(donor._doc.location.latitude)
			//logger.info(donor._doc.location.longitude)
			//});
			





		}
		await bloodRecord.save();

		return res.status(200).json({
			isSuccess: true,
			message: "Record updated successfully.",
			
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			isSuccess: false,
			message: "An internal server error occurred. Please try again later.",
		});
	}
});

module.exports = router;
