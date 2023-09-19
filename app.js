// Set up environment variables in development
require("./src/utils/env")();

// Imports
const cors = require("./src/utils/cors");
const { connect } = require("./src/utils/db");
const express = require("express");
const error = require("./src/middlewares/error");

// Initiate express app
const app = express();

// Parse JSON requests
app.use(express.json());

// Setup cross-origin resource sharing
app.use(cors());

// Routes

// Error middleware
app.use(error);

// Connect to database and start server
connect(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started");
    });
});
