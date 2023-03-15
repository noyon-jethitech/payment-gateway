/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const { pubSub } = require('../../../pubsub');
const sendMail = require('../../../utils/emails/methods/send-email');
const { CustomApolloError } = require('../../../utils/error-handler');
const rechargeLogger = require('../recharge-logger');
const recharge = require('../../../models/recharge.model');


const updateRechargeDetails = async (_, { input }, ctx) => {
  const RECHARGE_UPDATED = 'RECHARGE_UPDATED';
  try {
    const { id } = input;
    const {
      recharge: RechargeModel,
    } = ctx.models;

    const data = {
      input,
    };

    const rechargeUpdate = await RechargeModel.update(data, { where: { id } });
    pubSub.publish(RECHARGE_UPDATED, {
      rechargeUpdate,
    });

    return rechargeUpdate;
  } catch (error) {
    rechargeLogger();
    throw error;
  }
};

module.exports = { updateRechargeDetails };
