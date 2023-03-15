const { getComplexity, simpleEstimator } = require('graphql-query-complexity');
const { separateOperations } = require('graphql');
const CONFIG = require('../../config/config');
const { getMessage } = require('./messages');
const { CustomApolloError } = require('./error-handler');

const queryComplexityPlugin = schema => ({
  requestDidStart: () => ({
    didResolveOperation({ request, document }) {
      const complexity = getComplexity({
        schema,
        query: request.operationName
          ? separateOperations(document)[request.operationName]
          : document,
        variables: request.variables,
        estimators: [
          simpleEstimator({
            defaultComplexity: 1,
          }),
        ],
      });
      const COMPLEXITY_THRESHOLD = Number(CONFIG.queryComplexity);
      if (complexity >= COMPLEXITY_THRESHOLD) {
        throw new CustomApolloError(getMessage('COMPLEX_QUERY'));
      }
    },
  }),
});

module.exports = queryComplexityPlugin;
