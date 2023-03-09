/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const sendMail = require('../../../utils/emails/methods/send-email');

const { CustomApolloError } = require('../../../utils/error-handler');
const rechargeLogger = require('../recharge-logger');
const RESET_EXPIRY_TTL = 5;



const createRechargeDetails = async (_, { input }, ctx) => {

  try {
    // const { feature, minutes, month, minutes_comsumed, recharge_date } = args.input;

    const {
      recharge: RechargeModel,
    } = ctx.models;

    const data = {
      // feature,
      // month,
      // minutes,
      // minutes_comsumed,
      // recharge_date
      ...input,
    }

    const res = await RechargeModel.create(data);
    return { message: 'The Recharge is suuceesful' };
  } catch (e) {
    rechargeLogger();
    throw e;
  }
}

module.exports = { createRechargeDetails };
