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
      ...input,
    };
    console.log(data);
    // console.log(RechargeModel)
    const rechargeUpdate = await RechargeModel.update(data, { where: { id } });
    console.log(rechargeUpdate, "updated recharge");
    pubSub.publish(RECHARGE_UPDATED, {
      rechargeUpdate,
    });

    const rechargeInstance = await RechargeModel.findByPk(id);

    if (!rechargeInstance) {
      throw new CustomApolloError(getMessage('RECHARGE_INFO_NOT_FOUND'));
    }
    return rechargeInstance;
  } catch (error) {
    rechargeLogger();
    throw error;
  }
};

module.exports = { updateRechargeDetails };
