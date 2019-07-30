const path = require('path')
const winston = require('winston')

const options = {
  file: {
    level: 'info',
    filename: `${path.resolve()}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
  },
}

const transports = {
  console: new (winston.transports.Console)(options.console),
  file: new (winston.transports.File)(options.file)
}

const logger = winston.createLogger({
  transports: [
    transports.console,
    transports.file
  ],
  format: winston.format.combine(
    winston.format.prettyPrint({
      deep: true
    }),
    winston.format.colorize({
      all: true
    }),
    winston.format.printf(
      (info) => {
        return `${info.message}`;
      })
  ),
  exitOnError: false,
})

module.exports = {logger, transports}