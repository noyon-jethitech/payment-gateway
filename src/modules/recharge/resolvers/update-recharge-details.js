/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const sendMail = require('../../../utils/emails/methods/send-email');
const { CustomApolloError } = require('../../../utils/error-handler');
const rechargeLogger = require('../recharge-logger');

const updateRechargeDetails = async (_, args, ctx) => {
  try {
    const { id } = args.input;
    const {
      recharge: RechargeModel,
    } = ctx.models;

    const data = {
      id,
    };
    await RechargeModel.update(data, { where: { id } });
    return { message: 'The Recharge is suuceesful updated' };
  } catch (error) {
    rechargeLogger();
    throw error;
  }
};

module.exports = { updateRechargeDetails };
