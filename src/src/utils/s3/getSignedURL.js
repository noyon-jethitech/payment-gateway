const path = require('path');
const { nanoid } = require('nanoid');
const defaultLogger = require('../../logger');
const s3 = require('./s3');
const CONFIG = require('../../../config/config');

const { bucket, region, endpoint } = CONFIG.s3;

const generateSignedUrl = (filename, filetype) => {
  try {
    const fileExtension = path.extname(filename).toLowerCase();
    const transformedFilename = `${nanoid()}${fileExtension}`;

    const s3PutParams = {
      Bucket: bucket,
      Key: transformedFilename,
      Expires: 15000,
      ContentType: filetype,
      ACL: 'public-read',
    };

    const signedURL = s3.getSignedUrl('putObject', s3PutParams);

    const fileURL = endpoint
      ? `https://${bucket}.${region}.digitaloceanspaces.com/${transformedFilename}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${transformedFilename}`;

    return {
      signedURL,
      fileURL,
    };
  } catch (error) {
    defaultLogger(`Error From generateAWSSignedURL >> ${error}`, null, 'error');
    throw error;
  }
};

module.exports = generateSignedUrl;
