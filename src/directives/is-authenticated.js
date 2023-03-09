const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { getUser } = require('../utils/context');
const defaultLogger = require('../logger');
const { CustomAuthenticationError } = require('../utils/error-handler');
const { getMessage } = require('../utils/messages');

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    try {
      this.field = field;
      const { resolve = defaultFieldResolver } = this.field;

      this.field.resolve = async (...args) => {
        const context = args[2];

        context.req.user = await getUser(context.req, context.models.user);
        if (!context || !context.req || !context.req.user) {
          throw new CustomAuthenticationError(getMessage('NOT_AUTHORIZED'));
        }

        return resolve.apply(this, args);
      };
    } catch (err) {
      defaultLogger(`ERROR WHILE Authentication >>>  ${err}`, null, 'error');
      throw err;
    }
  }
}

module.exports = {
  directive: IsAuthenticatedDirective,
};
