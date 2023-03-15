/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const sendMail = require('../../../utils/emails/methods/send-email');

const { CustomApolloError } = require('../../../utils/error-handler');
const rechargeLogger = require('../recharge-logger');
const { subscribe } = require('../../..');
const RESET_EXPIRY_TTL = 5;

const timeUpdated = (_, { input }, { pubsub }) => {
    async subscribe(parent, arguments, { pubsub }){
        return pubsub.asyncIterator("updated_recharge_model")
    }


}

module.exports = { createRechargeDetails };
