
const { getRechargeDetails } = require('./get-recharge-details');
const { createRechargeDetails } = require('./create-recharge-details');
const { updateRechargeDetails } = require('./update-recharge-details');

const resolvers = {
  Query: {
    getRechargeDetails,
  },
  Mutation: {
    createRechargeDetails,
    updateRechargeDetails,
  },
};


module.exports = resolvers;
