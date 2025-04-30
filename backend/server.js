const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors()); // <-- CORS middleware should be applied first

// Middleware to parse JSON (Replace body-parser with Express built-in method)
app.use(express.json());  // <-- Use express's built-in JSON parser

// MongoDB URL from environment variables
const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connection Success!');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// Import and use the routes for blood inventory
const bloodInventoryRoutes = require('./routes/bloodInventoryRoutes');
app.use('/api/blood-inventory', bloodInventoryRoutes);

// Import and use the routes for sent blood
const sentBloodRoutes = require('./routes/sentBloodRoutes');
app.use('/api/sent-blood', sentBloodRoutes);


HEAD

// Example route
/*app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});*/

// Routes
const donAppointmentRoutes = require('./routes/DonAppointments');
app.use('/DonAppointments', donAppointmentRoutes);

const donorCenterRoutes = require('./routes/donorCenters');
app.use('/donorCenters', donorCenterRoutes);


// Start the server
 feature/Blood-Collection-Management
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
