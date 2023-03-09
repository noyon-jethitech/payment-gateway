const { buildCheckFunction } = require('express-validator');
const { getMessage } = require('../utils/messages');

const checkBody = buildCheckFunction(['body']);

const createFolderSchema = [
  checkBody('email')
    .notEmpty().withMessage(getMessage('EMAIL_REQUIRED'))
    .trim(),
];

module.exports = createFolderSchema;
