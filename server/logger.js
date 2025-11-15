const winston = require('winston');

// Create a custom logger
const logger = winston.createLogger({
  level: 'info',  // Default log level (could be 'debug', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    // Log to a file
    new winston.transports.File({ filename: 'logs/system.log' }),
    // Optionally log to console as well
    new winston.transports.Console()
  ]
});

module.exports = logger;
