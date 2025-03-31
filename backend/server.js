const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // For parsing application/json


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
    });



// Example route
/*app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});*/

// Routes
const donAppointmentRoutes = require('./routes/DonAppointments');
app.use('/DonAppointments', donAppointmentRoutes);

const donorCenterRoutes = require('./routes/donorCenters');
app.use('/donorCenters', donorCenterRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
