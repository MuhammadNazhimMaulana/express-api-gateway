const express = require('express');
const methodOverride = require('method-override')
const {setupLogging} = require('./config/logging');
const {setupRateLimit} = require("./config/ratelimit");
const {ROUTES} = require("./routes/main.route");
const {setupProxies} = require("./config/proxy");

// Env
require('dotenv').config();

const app = express();

// Logging
setupLogging(app);

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Rate Limit
setupRateLimit(app, ROUTES);

// Routes
setupProxies(app, ROUTES);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})