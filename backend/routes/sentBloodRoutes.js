// routes/sentBloodRoutes.js
const express = require('express');
const router = express.Router();
const BloodSent = require('../models/BloodSent');
const mongoose = require('mongoose');

// 1. Create: Add a new sent blood record
router.post('/add', async (req, res) => {
    const { bloodType, sentUnits, sentDate, sentID, status } = req.body;

    try {
        const newBloodSent = new BloodSent({
            bloodType,
            sentUnits,
            sentDate,
            sentID,
            status,
        });

        await newBloodSent.save();
        res.status(201).json({ message: 'Blood sent record added successfully', data: newBloodSent });
    } catch (error) {
        res.status(500).json({ message: 'Error adding blood sent record', error });
    }
});

// 2. Read: View all sent blood records
router.get('/', async (req, res) => {
    try {
        const sentBloodRecords = await BloodSent.find();
        res.status(200).json({ message: 'Sent blood records retrieved successfully', data: sentBloodRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving sent blood records', error });
    }
});

// 3. Update: Update sent blood record by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { sentUnits, status } = req.body;

    try {
        const updatedBloodSent = await BloodSent.findByIdAndUpdate(
            id,
            { sentUnits, status },
            { new: true }
        );

        if (!updatedBloodSent) {
            return res.status(404).json({ message: 'Sent blood record not found' });
        }

        res.status(200).json({ message: 'Sent blood record updated', data: updatedBloodSent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sent blood record', error });
    }
});

// 4. Delete: Remove a sent blood record by its ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const deletedBloodSent = await BloodSent.findByIdAndDelete(id);

        if (!deletedBloodSent) {
            return res.status(404).json({ message: 'Sent blood record not found for the given ID' });
        }

        res.status(200).json({ message: 'Sent blood record removed successfully', data: deletedBloodSent });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error deleting sent blood record', error });
    }
});

module.exports = router;
