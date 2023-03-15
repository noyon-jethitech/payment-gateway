const { transports } = require('winston');
const winston = require('winston');

const { defaultLoggerConfig } = require('../../logger');

const loggerInstance = winston.createLogger({
  ...defaultLoggerConfig,
  defaultMeta: {
    service: 'Rest Folder',
  },
  transports: [new transports.Console()],
});

const folderLogger = (message, req = {}, level = 'info') => {
  // eslint-disable-next-line security/detect-object-injection
  loggerInstance.child({
    requestId: req?.requestId,
    reqIp: req?.ip,
    userId: req?.userId,
  })[level](message);
};

module.exports = folderLogger;
