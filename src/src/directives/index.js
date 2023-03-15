const isAuthenticated = require('./is-authenticated');

module.exports = {
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
  },
};
