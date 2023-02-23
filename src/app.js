const express = require('express');
const methodOverride = require('method-override')
const {setupLogging} = require('./config/logging.config');
const {setupRateLimit} = require("./config/ratelimit.config");
const { getAll } = require('./controllers/endpoints.controller');
// const {ROUTES} = require("./routes/api.route");
const {setupProxies} = require("./config/proxy.config");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Env
require('dotenv').config();

// Database Connection
require('./config/db.config');

const app = express();

// Setup ejs
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, '../src/views'));

// Logging
setupLogging(app);

// Use Cookie Parser
app.use(cookieParser());

// Use Session
app.use(session({
    secret:'geeksforgeeks',
    saveUninitialized: true,
    resave: true
}));

// Flash Session
app.use(flash());

// Set up method override
app.use(methodOverride('_method'));

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Route Auth
const auth_route = require('./routes/auth.route');
app.use('/auth', auth_route);

// Route Endpoint
const endpoint = require('./routes/endpoints.route');
app.use('/endpoint', endpoint);

// Route Main
const main_route = require('./routes/main.route');
app.use('/', main_route);

const PORT = process.env.PORT;
  
// Fetching All Data First
getAll().then((ROUTES) => {

    app.listen(PORT, () => {
        console.log(`Server Jalan di http://localhost:${PORT}`);
         
        // Rate Limit
        setupRateLimit(app, ROUTES);

        // Routes Gateway
        setupProxies(app, ROUTES);
    })
}) 

module.exports = app;