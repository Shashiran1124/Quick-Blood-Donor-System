const mongoose = require('mongoose');

const donorCenterSchema = new mongoose.Schema({
  centerName: { type: String, required: true },
  centerCode: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String },
  postalCode: { type: String },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  openingStart: { type: String, required: true }, // HH:MM format
  openingEnd: { type: String, required: true },
  daysOpen: [{ type: String }],
  donationTypes: [{ type: String }],
  maxCapacity: { type: Number, required: true, min: 1 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('DonorCenter', donorCenterSchema);
