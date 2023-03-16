
const { getRechargeDetails } = require('./get-recharge-details');
const { createRechargeDetails } = require('./create-recharge-details');
const { updateRechargeDetails } = require('./update-recharge-details');
const { pubSub } = require('../../../pubsub');

const RECHARGE_ADDED = 'RECHARGE_ADDED';
const RECHARGE_UPDATED = 'RECHARGE_UPDATED';
const resolvers = {
  Query: {
    getRechargeDetails,
  },
  Mutation: {
    createRechargeDetails,
    updateRechargeDetails,
  },
  Subscription: {
    rechargeCreated: {
      subscribe: () => pubSub.asyncIterator(RECHARGE_ADDED),
    },
    rechargeUpdated: {
      subscribe: () => pubSub.asyncIterator(RECHARGE_UPDATED),
    },
  },
};

module.exports = resolvers;
