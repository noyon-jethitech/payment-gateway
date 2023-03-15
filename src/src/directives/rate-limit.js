const { createRateLimitDirective } = require('graphql-rate-limit');
const { CustomApolloError } = require('../utils/error-handler');
const { getMessage } = require('../utils/messages');

const rateLimitDirective = createRateLimitDirective({
  identifyContext: ctx => ctx.id,
  createError: () => new CustomApolloError(getMessage('RATE_LIMIT')),
});

module.exports = rateLimitDirective;
