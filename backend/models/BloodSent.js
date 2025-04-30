const mongoose = require('mongoose');

const bloodSentSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    sentUnits: {
        type: Number,
        required: true,
        min: 0,
    },
    sentDate: {
        type: Date,
        required: true,
    },
    sentID: {
        type: String,
        required: true, // Assuming this would be an identifier for the recipient or transaction
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Expired', 'Transferred'],
        default: 'Transferred',
    },
});

module.exports = mongoose.model('BloodSent', bloodSentSchema);
