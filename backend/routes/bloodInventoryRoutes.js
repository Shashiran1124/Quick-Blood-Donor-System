const express = require('express');
const router = express.Router();
const BloodInventory = require('../models/BloodInventory');
const mongoose = require('mongoose');

// Create: Add a new blood unit when a donation is received
router.post('/add', async (req, res) => {
    const { bloodType, unitsAvailable, donationDate, expirationDate, donorID, status } = req.body;

    try {
        const newBlood = new BloodInventory({
            bloodType,
            unitsAvailable,
            donationDate,
            expirationDate,
            donorID,
            status,
        });

        await newBlood.save();
        res.status(201).json({ message: 'Blood donation added successfully', data: newBlood });
    } catch (error) {
        res.status(500).json({ message: 'Error adding blood donation', error });
    }
});

//Read: View available stock of each blood type
router.get('/', async (req, res) => {
    try {
        const bloodStocks = await BloodInventory.find();
        res.status(200).json({ message: 'Blood stock retrieved successfully', data: bloodStocks });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blood stock', error });
    }
});

//Update: Update stock when blood is used or donated
router.put('/update', async (req, res) => {
    const { bloodType, unitsAvailable, status } = req.body;

    try {
        const updatedBlood = await BloodInventory.findOneAndUpdate(
            { bloodType },  // Find by bloodType
            { unitsAvailable, status },
            { new: true }
        );

        if (!updatedBlood) {
            return res.status(404).json({ message: "Blood type not found" });
        }

        res.status(200).json({ message: "Blood inventory updated", data: updatedBlood });
    } catch (error) {
        res.status(500).json({ message: "Error updating blood inventory", error });
    }
});



//* 4. Delete: Remove expired or transferred blood units
router.delete('/delete/:bloodType', async (req, res) => {
    try {
        const deletedBlood = await BloodInventory.deleteMany({ bloodType: req.params.bloodType });

        if (deletedBlood.deletedCount === 0) {
            return res.status(404).json({ message: 'No blood units found for the given blood type' });
        }

        res.status(200).json({ message: 'Blood units removed successfully', data: deletedBlood });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blood units', error });
    }
});


module.exports = router;
