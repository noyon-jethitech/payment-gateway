const jwt = require('jsonwebtoken');
const { getMessage } = require('./messages');
const CONFIG = require('../../config/config');
const defaultLogger = require('../logger');
const { CustomAuthenticationError } = require('./error-handler');

const JWT_SECRET = CONFIG.jwt.secret;
const JWT_LIFE_TIME = CONFIG.jwt.lifeTime;
const JWT_REFRESH_TOKEN_LIFE_TIME = CONFIG.jwt.refreshTokenLifeTime;

const generateToken = (userId, isRefreshToken = false) => new Promise((resolve, reject) => {
  jwt.sign({
    userId,
  }, JWT_SECRET, {
    expiresIn: isRefreshToken ? JWT_REFRESH_TOKEN_LIFE_TIME : JWT_LIFE_TIME,
  }, (error, token) => {
    if (error) {
      return reject(error);
    }
    resolve(token);
    return true;
  });
});

const getDecodedToken = token => new Promise((resolve, reject) => {
  try {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          const jwtError = new CustomAuthenticationError(getMessage('SESSION_EXPIRED'));
          jwtError.code = 'JWT_EXPIRE';
          return reject(jwtError);
        }
        return reject(new CustomAuthenticationError(error));
      }

      if (!decodedToken.exp || !decodedToken.iat) {
        return reject(new CustomAuthenticationError('Token had no \'exp\' or \'iat\' payload'));
      }
      resolve(decodedToken);
      return true;
    });
  } catch (err) {
    defaultLogger(`Error While getDecodedToken >> ${err}`, null, 'error');
    throw err;
  }
  return true;
});

module.exports = { generateToken, getDecodedToken };
