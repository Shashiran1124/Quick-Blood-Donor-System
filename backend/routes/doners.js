const express = require("express");
const router = express.Router();
const Doners = require("../models/Doners"); 

router.post("/add", async (req, res) => {
    try {
        const { userId, name, email, address, location, bloodType } = req.body;

        if (!userId || !name || !email || !address || !location || !bloodType) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Validate blood type against enum values
        const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        if (!validBloodTypes.includes(bloodType)) {
            return res.status(400).json({ message: "Invalid blood type!" });
        }

        const newDonor = new Doners({ userId, name, email, address, location, bloodType });
        await newDonor.save();

        res.status(201).json({ message: "Donor added successfully!", donor: newDonor });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const donors = await Doners.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id}=req.params;
        
        
        const donor = await Doners.findById(id);//req.params.id
        if (!donor) {//donor
            return res.status(404).json({ message: "Donor not found!" });
        }
        res.status(200).json(donor);
    } catch (error) {
        console.log("GETID")//
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const updatedDonor = await Doners.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false });
        if (!updatedDonor) {
            return res.status(404).json({ message: "Donor not found!" });
        }
        res.status(200).json({ isSuccess : true, message: "Donor updated successfully!" });
    } catch (error) {
        res.status(500).json({ isSuccess : false, message: "Server Error" } );
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedDonor = await Doners.findByIdAndDelete(req.params.id);
        if (!deletedDonor) {
            return res.status(404).json({ message: "Donor not found!" });
        }
        res.status(200).json({ message: "Donor deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
