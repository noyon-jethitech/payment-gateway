const { getExample } = require('./get-example');
const { createExample } = require('./create-example');

const resolvers = {
  Query: {
    getExample,
  },
  Mutation: {
    createExample,
  },
};

module.exports = resolvers;
