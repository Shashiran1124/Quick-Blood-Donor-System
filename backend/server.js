const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
  .then(() => console.log('MongoDB Connection Success!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// ROUTES

// Blood inventory routes
const bloodInventoryRoutes = require('./routes/bloodInventoryRoutes');
app.use('/api/blood-inventory', bloodInventoryRoutes);

// Sent blood routes
const sentBloodRoutes = require('./routes/sentBloodRoutes');
app.use('/api/sent-blood', sentBloodRoutes);

// Donor appointments
const donAppointmentRoutes = require('./routes/DonAppointments');
app.use('/DonAppointments', donAppointmentRoutes);

// Donor centers
const donorCenterRoutes = require('./routes/donorCenters');
app.use('/donorCenters', donorCenterRoutes);

// Hospital blood type inventory
const hosBloodRouter = require('./routes/hospitalBloodTypeInventory');
app.use('/hosBloodInve', hosBloodRouter);

// Login routes
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Donors
const userRouter = require('./routes/doners');
app.use('/donors', userRouter);

// Seed database (optional - make sure this doesn’t duplicate)
const { seedDatabaseAsync } = require('./infrastructure/data/mongo.db.data.initializer');
seedDatabaseAsync();

// Home route
app.get('/', (req, res) => {
  res.send('<h3>🖥️ Welcome API Documentation</h3>');
});

// Logger
const logger = require('./utils/logger');
app.listen(PORT, () => {
  logger.info(`Web API Development: ${PORT}`);
});
