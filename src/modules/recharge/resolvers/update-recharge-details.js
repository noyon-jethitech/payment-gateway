/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const sendMail = require('../../../utils/emails/methods/send-email');
const { CustomApolloError } = require('../../../utils/error-handler');
const rechargeLogger = require('../recharge-logger');
const recharge = require('../../../models/recharge.model');

const updateRechargeDetails = async (_, args, ctx) => {
  try {
    const { id } = args.input;
    const {
      recharge: RechargeModel,
    } = ctx.models;

    const { pubsub } = ctx;

    const data = {
      id,
    };

    const rechargeUpdate = await RechargeModel.update(data, { where: { id } });
    pubsub.publish("updated_recharge_model", {
      rechargeUpdate,
    });
    return { message: 'The Recharge is suuceesful updated' };
  } catch (error) {
    rechargeLogger();
    throw error;
  }
};

module.exports = { updateRechargeDetails };
