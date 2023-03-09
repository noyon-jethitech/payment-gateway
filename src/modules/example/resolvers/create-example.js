/* eslint-disable no-param-reassign */
const moment = require('moment');
const randomstring = require('randomstring');
const { nanoid } = require('nanoid');
const { getMessage } = require('../../../utils/messages');
const sendMail = require('../../../utils/emails/methods/send-email');
const exampleLogger = require('../example-logger');
const { CustomApolloError } = require('../../../utils/error-handler');

const RESET_EXPIRY_TTL = 5;

const generateOtpAndSendEmail = async exampleInstance => {
  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  exampleInstance.otp = otp;
  exampleInstance.otpExpireTime = moment().add(RESET_EXPIRY_TTL, 'minutes').toISOString();
  exampleInstance.wrongOtpAttempt = 0;

  const example = await exampleInstance.save();

  await sendMail({
    toEmailAddresses: [example.email],
    templateKey: 'OTP_AUTHENTICATION',
    data: {
      otp: example.otp,
    },
  });
};

const createExample = async (_, args, ctx) => {
  try {
    const { email } = args.input;
    const {
      example: ExampleModel,
    } = ctx.models;

    const lowerCaseEmail = email.toLowerCase();

    if (!email) {
      throw new CustomApolloError(getMessage('EMAIL_REQUIRED'));
    }

    let exampleInstance = await ExampleModel.findOne({ where: { email: lowerCaseEmail } });

    if (!exampleInstance) {
      const data = {
        email: lowerCaseEmail,
        role: 'USER',
        refreshToken: nanoid(),
      };
      exampleInstance = await ExampleModel.create(data);
    }

    await generateOtpAndSendEmail(exampleInstance);

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_VERIFICATION'),
    };

    return response;
  } catch (error) {
    exampleLogger(`ERROR WHILE login >>> ${error}`, ctx, 'error');
    throw error;
  }
};

module.exports = { createExample };
