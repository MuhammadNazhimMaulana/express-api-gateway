const morgan = require("morgan");

setupLogging = (app) => {
    return app.use(morgan('combined'));
}

module.exports = {
    setupLogging
};