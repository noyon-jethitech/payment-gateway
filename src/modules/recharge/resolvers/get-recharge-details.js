const { CustomApolloError } = require('../../../utils/error-handler');
const { getMessage } = require('../../../utils/messages');
const rechargeLogger = require('../recharge-logger');

require('dotenv');


const getRechargeDetails = async (_, args, ctx) => {
  try {
    const { models, req } = ctx;
    const {
      recharge: RechargeModel,
    } = models;

    const { recharge: rechargeObj } = req;

    const rechargeInstance = await RechargeModel.findByPk(rechargeObj.id);

    if (!rechargeInstance) {
      throw new CustomApolloError(getMessage('RECHARGE_INFO_NOT_FOUND'));
    }
    return rechargeInstance;
  } catch (error) {
    rechargeLogger();
    throw error;
  }
}


module.exports = { getRechargeDetails };
