/* eslint-disable no-console */
const _ = require('lodash');
const request = require('request');
const CONFIG = require('../../config/config');

const sendPush = data => {
  const pushData = {};
  pushData.appId = CONFIG.oneSignal.appId;
  if (data.title != null) {
    pushData.headings = {
      en: data.title,
    };
  }

  if (data.content != null) {
    pushData.contents = {
      en: data.content,
    };
  }

  if (!_.isEmpty(data.segments)) {
    pushData.includedSegments = data.segments;
  }

  if (!_.isEmpty(data.addtionalData)) {
    pushData.data = data.addtionalData;
  }

  if (!_.isEmpty(data.filters)) {
    pushData.filters = data.filters;
  }

  if (!_.isEmpty(data.players)) {
    pushData.includePlayerIds = data.players;
  }

  const options = {
    url: CONFIG.oneSignal.url,
    headers: {
      Authorization: `Basic ${CONFIG.oneSignal.apiKey}`,
      'content-type': 'application/json',
    },
    body: pushData,
    json: true,
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.error('ERROR > SEND NOTIFICATION > ', error);
    }
    console.log('notification data - ', body);
  });
};

module.exports = sendPush;
