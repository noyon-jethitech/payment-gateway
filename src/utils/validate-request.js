/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const status = require('http-status');

module.exports = async (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result;

  res.status(status.BAD_REQUEST).send({
    error: {
      code: status.BAD_REQUEST,
      message: error,
    },
  });
};
