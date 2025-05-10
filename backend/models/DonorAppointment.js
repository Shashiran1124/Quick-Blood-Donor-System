const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  donorName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  contactNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  appointmentDate: { type: Date, required: true },
  timeSlot: { 
    type: String, 
    required: true, 
    enum: ['Morning (8.00 A.M - 11.00 A.M', 'Afternoon (12.00 P.M - 3.00 P.M)', 'Evening (4.00 P.M - 6.00 P.M )'] 
  },
  donationType: { 
    type: String, 
    required: true, 
    enum: ['Whole Blood', 'Plasma', 'Platelets'] 
  },
  donationCenter: { type: String }, 
  onMedication: { type: String, required: true, enum: ['Yes', 'No'] },
  recentIllness: { type: String, required: true, enum: ['Yes', 'No'] },
  recentDonation: { type: String, required: true, enum: ['Yes', 'No'] },
  recentVaccination: { type: String, required: true, enum: ['Yes', 'No'] }
}, { timestamps: true });

const DonorAppointment = mongoose.model('DonorAppointment', AppointmentSchema, 'donorappointments');
module.exports = DonorAppointment;
