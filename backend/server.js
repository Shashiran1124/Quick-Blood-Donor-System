const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); 

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

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

const bloodInventoryRoutes = require('./routes/bloodInventoryRoutes');


app.use('/api/blood-inventory', bloodInventoryRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Blood Inventory Management System');
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
