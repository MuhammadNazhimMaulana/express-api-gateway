const express = require('express');
const methodOverride = require('method-override')
const {setupLogging} = require('./config/logging.config');
const {setupRateLimit} = require("./config/ratelimit.config");
const {ROUTES} = require("./routes/api.route");
const {setupProxies} = require("./config/proxy.config");

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

// Routes Gateway
setupProxies(app, ROUTES);

// Route Main
const main_route = require('./routes/main.route');
app.use('/', main_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})