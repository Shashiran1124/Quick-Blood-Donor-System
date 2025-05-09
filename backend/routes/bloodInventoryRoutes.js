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

// Update: Update stock when blood is used or donated using a dynamic ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { unitsAvailable, status } = req.body;

    try {
        const updatedBlood = await BloodInventory.findByIdAndUpdate(
            id,
            { unitsAvailable, status },
            { new: true }
        );

        if (!updatedBlood) {
            return res.status(404).json({ message: 'Blood inventory not found' });
        }

        res.status(200).json({ message: 'Blood inventory updated', data: updatedBlood });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blood inventory', error });
    }
});




// 4. Delete: Remove a specific blood unit by its ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const deletedBlood = await BloodInventory.findByIdAndDelete(id);

        if (!deletedBlood) {
            return res.status(404).json({ message: 'Blood unit not found for the given ID' });
        }
         
        res.status(200).json({ message: 'Blood unit removed successfully', data: deletedBlood });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error deleting blood unit', error });
    }
});


module.exports = router;
