const mongoose = require('mongoose');

const bloodInventorySchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    unitsAvailable: {
        type: Number,
        required: true,
        min: 0,
    },
    donationDate: {
        type: Date,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    donorID: {
        type: String,
        required: false, // Optional
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Expired', 'Transferred'],
        default: 'Available',
    },
});

module.exports = mongoose.model('BloodInventory', bloodInventorySchema);
