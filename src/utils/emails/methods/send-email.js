const postData = require('./post-data');
const CONFIG = require('../../../../config/config');
const defaultLogger = require('../../../logger');
/**
 *
 * @param {data} object should contain below fields
 *  {fromEmailAddress}
 *  {fromEmailName}
 *  {toEmailAddresses}
 *  {templateKey} or
 *  {templateId}
 *  {data} as in JSON object of variable data
 *
 */
const sendEmail = async (data = {}) => {
  try {
    const reqData = {
      fromEmailName: data.fromName || CONFIG.emailServer.fromName,
      fromEmailAddress: data.fromEmail || CONFIG.emailServer.fromEmail,
      toEmailAddresses: data.toEmailAddresses,
      templateKey: data.templateKey,
      data: [data.data],
    };
    const response = await postData(`${CONFIG.emailServer.host}/email/send`, reqData);
    return response;
  } catch (e) {
    defaultLogger(`Error While sendEmail >> ${e}`, null, 'error');
    throw e;
  }
};
// for testing uncomment the below line
// sendEmail();
module.exports = sendEmail;
