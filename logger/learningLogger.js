// const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${level}]: ${timestamp} ${message}`;
});

const lerningLogger = () => {
	return (
			createLogger({
			  level: 'debug',
			  format: combine(
						    timestamp({format: "HH:mm:ss"}),
						    myFormat
						  ),
			  transports: [
			    new transports.Console(),
			    new transports.File({ filename: 'combined.log' }),
			  ],
			})
			)
}

module.exports = lerningLogger;