const express = require('express');
const methodOverride = require('method-override')
const {setupLogging} = require('./config/logging.config');
const {setupRateLimit} = require("./config/ratelimit.config");
const {ROUTES} = require("./routes/api.route");
const {setupProxies} = require("./config/proxy.config");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Env
require('dotenv').config();

const app = express();

// Setup ejs
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, '../src/views'));

// Logging
setupLogging(app);

// Set up method override
app.use(methodOverride('_method'));

app.use(expressLayouts);
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