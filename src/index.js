/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const expressip = require('express-ip');
const useragent = require('express-useragent');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const createGraphQLLogger = require('graphql-log');
const Sentry = require('@sentry/node');
const depthLimit = require('graphql-depth-limit');
const { applyMiddleware } = require('graphql-middleware');
const { sequelize } = require('./models');
const { models } = require('./models');
const bootFiles = require('./boot');
const { resolvers, typeDefs } = require('./modules');
const { directiveResolvers } = require('./directives/auth-directive');
const { logger } = require('./logger');
const { validateToken } = require('./utils/context');
const CONFIG = require('../config/config');
const packageJson = require('../package.json');
// const redirectController = require('./controllers/redirect');
const restrictDomain = require('./utils/restrict-domain');
const rateLimitDirective = require('./directives/rate-limit');
const queryComplexityPlugin = require('./utils/query-complexity');
const middlewares = require('./utils/middlewares');
const SentryLogsPlugin = require('./utils/sentry-logs');
const { CustomAuthenticationError, CustomApolloError, CustomForbiddenError } = require('./utils/error-handler');
const { getMessage } = require('./utils/messages');

const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(restrictDomain);
app.use(useragent.express());
const logExecutions = createGraphQLLogger({
  logger: logger.info,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressip().getIpInfoMiddleware);

app.use('*', (req, res, next) => {
  const query = req.query.query || req.body.query || '';
  const { queryLengthLimit } = CONFIG;
  if (query.length > queryLengthLimit) {
    logger.info(`QUERY LENGTH EXCEEDED ${queryLengthLimit} => ${query}`);
    res.status(400).send({
      errors: [{
        message: 'INVALID REQUEST',
      }],
    });
  }
  next();
});

logExecutions(resolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
  schemaDirectives: {
    rateLimit: rateLimitDirective,
  },
});

if (CONFIG.env === 'production' || CONFIG.env === 'staging') {
  Sentry.init({
    dsn: CONFIG.sentry,
    environment: CONFIG.env || 'development',
    release: packageJson.version,
  });
}

const SchemaWithMiddleware = applyMiddleware(schema, ...middlewares);

const server = new ApolloServer({
  schema: SchemaWithMiddleware,
  plugins: [
    queryComplexityPlugin(schema),
    SentryLogsPlugin(Sentry),
  ],
  introspection: ['localhost', 'dev', 'development', 'staging'].includes(CONFIG.env),
  playground: ['localhost', 'dev', 'development', 'staging'].includes(CONFIG.env),
  validationRules: [depthLimit(CONFIG.queryDepthLimit)],
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    let message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    // IGNORING VALIDATION ERRORS
    if (error.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
      return {
        ...error,
        message,
      };
    }

    // eslint-disable-next-line max-len
    if (!(error.originalError instanceof CustomAuthenticationError || error.originalError instanceof CustomApolloError || error.originalError instanceof CustomForbiddenError)) {
      message = getMessage('INTERNAL_SERVER_ERROR');
      console.log(error.originalError);// FOR SERVER ERRORS
      console.log(error);
      console.log(error);
      return {
        message,
      };
    }

    return {
      ...error,
      message,
    };
  },
  context: async ctx => ({
    req: ctx.req,
    res: ctx.res,
    models,
  }),
  subscriptions: {
    path: '/graphql',
    onConnect: connectionParams => {
      if (CONFIG.env === 'development') {
        logger.info('------------onConnect---------------');
      }
      if (connectionParams && connectionParams.authorization) {
        return validateToken(connectionParams.authorization, models.user)
          .then(user => ({
            user,
          })).catch(err => {
            console.error(err);
            throw new CustomAuthenticationError(getMessage('NOT_AUTHORIZED'));
          });
      }
      throw new CustomApolloError(getMessage('MISSING_AUTH_TOKEN'));
    },
    onDisconnect: () => {
      if (CONFIG.env === 'development') {
        logger.info('------------onDisconnect---------------');
      }
    },
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.get('/version', (req, res) => {
  res.json({
    version: packageJson.version,
  });
});

sequelize.sync().then(async () => {
  httpServer.listen(CONFIG.port, () => {
    console.log(`Server ready at http://localhost:${CONFIG.port}/graphql`);
  });

  // ON BOOT
  bootFiles(models);
  return true;
}).catch(error => { throw error; });

module.exports = app;
