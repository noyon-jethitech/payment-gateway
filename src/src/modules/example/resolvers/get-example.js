const { CustomApolloError } = require('../../../utils/error-handler');
const { getMessage } = require('../../../utils/messages');
const exampleLogger = require('../example-logger');
require('dotenv');

const getExample = async (_, args, ctx) => {
  try {
    const { models, req } = ctx;
    const {
      example: ExampleModel,
    } = models;
    const { example: exampleObj } = req;
    const exampleInstance = await ExampleModel.findByPk(exampleObj.id);
    if (!exampleInstance) {
      throw new CustomApolloError(getMessage('USER_NOT_FOUND'));
    }

    return exampleInstance;
  } catch (error) {
    exampleLogger(`ERROR WHILE FETCHING example>>> ${error}`, ctx, 'error');
    throw error;
  }
};

module.exports = { getExample };
