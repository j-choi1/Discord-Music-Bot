import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'MM/DD/YYYY hh:mm:ss A'
    }),
    format.json()
  ),
  transports: [new transports.Console()]
});

export default logger;
