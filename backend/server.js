const dotenv = require("dotenv");
dotenv.config();
const configurationManager = require("./config/ApiConfig.js");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("./utils/logger.js");
const helmet = require("helmet");
const cors = require("cors");
const { seedDatabaseAsync } = require("./infrastructure/data/mongo.db.data.initializer.js");
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
	logger.info(`Web API Development: ${PORT}`);
});

/*npm run local:server*/
