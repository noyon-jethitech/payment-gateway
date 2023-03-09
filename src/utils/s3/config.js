require('dotenv').config();

const CONFIG = require('../../../config/config');

const {
  bucket, accessKeyId, secretAccessKey, region, endpoint,
} = CONFIG.s3;

const s3 = {
  bucket,
  accessKeyId,
  secretAccessKey,
  region,
};

if (endpoint) {
  s3.endpoint = endpoint;
}

module.exports = {
  s3,
};
