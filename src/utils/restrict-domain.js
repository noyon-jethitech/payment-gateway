const CONFIG = require('../../config/config');

// eslint-disable-next-line consistent-return
const restrictDomain = (req, res, next) => {
  if (req.path.split('/')[1] === 'graphql' && req.headers.host !== CONFIG.baseDomain) {
    const errorPage = `${CONFIG.clientUrl}/error`;
    return res.redirect(errorPage);
  }
  next();
};

module.exports = restrictDomain;
