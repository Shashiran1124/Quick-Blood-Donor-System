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

dotenv.config();
const configurationManager = require("./config/ApiConfig.js");
const logger = require("./utils/logger.js");
const helmet = require("helmet");

const { seedDatabaseAsync } = require("./infrastructure/data/mongo.db.data.initializer.js");


//Enable All CORS Requests
app.use(
	cors({
		origin: "*",
		allowedHeaders: "*",
		exposedHeaders: ["Content-Disposition", "Content-Type"],
	})
);

app.use(helmet());
app.use(express.json()); // For parsing application/json

mongoose.connect(configurationManager.connectionString);

mongoose.connection.once("open", () => {///
	logger.info(" Connect Database....");
});

// Example route
app.get("/", (request, response) => {
	response.send("<h3>🖥️ Welcome API Documentation</h3>");
});

const hosBloodRouter = require("./routes/hospitalBloodTypeInventory.js");
app.use("/hosBloodInve", hosBloodRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

seedDatabaseAsync();

const userRouter = require("./routes/doners.js");
app.use("/donors",userRouter);

app.listen(PORT, () => {
	logger.info(`Web API Development: ${PORT}`);
});

/*npm run local:server*/
