const request = require('request');
const { merge } = require('lodash');
const defaultLogger = require('../../../logger');
const CONFIG = require('../../../../config/config');

module.exports = async (url, data) => {
  const appData = {
    applicationId: CONFIG.emailServer.appId,
    secretKey: CONFIG.emailServer.secretKey,
  };
  const reqObj = {
    url,
    body: merge(appData, data),
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  };

  defaultLogger(`EMAIL REQ OBJ > ${reqObj}`);
  // Default options are marked with *
  request.post(reqObj, (error, response, body) => {
    if (error) {
      defaultLogger(`ERROR > MAIL API > ${error}`, null, 'error');
    } else {
      defaultLogger(`STATUS CODE > ${response.statusCode}`);
      defaultLogger(`RESP BODY > ${body}`);
    }
  });
};
