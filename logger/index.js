let logger = null;
require('dotenv').config();
const learningLogger = require('./learningLogger');
if (process.env.NODE_ENV !== 'production') {
  logger = learningLogger();
}

module.exports = logger;