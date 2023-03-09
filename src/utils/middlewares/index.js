const logClientNameMiddleware = require('./log-client-name');
const logIpMiddleware = require('./log-ip');
const requestIdMiddleware = require('./request-id');
const userIdMiddleware = require('./user-id');

module.exports = [
  logClientNameMiddleware,
  logIpMiddleware,
  userIdMiddleware,
  requestIdMiddleware,
];
