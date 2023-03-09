const { getDecodedToken, generateToken } = require('./token');
const { getMessage } = require('./messages');
const defaultLogger = require('../logger');
const { CustomAuthenticationError } = require('./error-handler');

const refreshTokens = async (refreshToken, UserModel) => {
  let userId = -1; let
    user;
  try {
    const decodedToken = await getDecodedToken(refreshToken);
    user = await UserModel.findByPk(decodedToken.userId);
    userId = user.id;
  } catch (error) {
    return {};
  }

  const newToken = await generateToken(userId);
  const newRefreshToken = await generateToken(userId, true);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

const getUser = async (req, res, UserModel) => {
  if (!req) {
    return null;
  }
  const token = req.headers.authorization;
  if (!token) {
    throw new CustomAuthenticationError(getMessage('NOT_LOGGEDIN'));
  }

  if (!token.startsWith('Bearer ')) {
    throw new CustomAuthenticationError(getMessage('INVALID_TOKEN'));
  }

  const authToken = token.slice(7, token.length);
  try {
    const decodedToken = await getDecodedToken(authToken);
    const user = await UserModel.findByPk(decodedToken.userId);
    return user;
  } catch (error) {
    const refreshToken = req.headers['x-refresh-token'];
    const newTokens = await refreshTokens(refreshToken, UserModel);
    if (newTokens.token && newTokens.refreshToken && newTokens.user) {
      res.set('x-token', newTokens.token);
      res.set('x-refresh-token', newTokens.refreshToken);
      return newTokens.user;
    }
    defaultLogger(`Error while decode authToken > ${error}`, null, 'error');
    throw error;
  }
};

const validateToken = async (token, UserModel) => {
  if (!token.startsWith('Bearer ')) {
    throw new CustomAuthenticationError(getMessage('INVALID_TOKEN'));
  }

  const authToken = token.slice(7, token.length);
  try {
    const decodedToken = await getDecodedToken(authToken);
    const user = await UserModel.findByPk(decodedToken.userId);
    return user;
  } catch (error) {
    defaultLogger(`Error while validate authToken > ${error}`, null, 'error');
    throw error;
  }
};

module.exports = { getUser, validateToken };
