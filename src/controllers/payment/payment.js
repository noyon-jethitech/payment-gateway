

const defaultLogger = require('../../logger');
const { models } = require('../../models/index');
const CONFIG = require('../../../config/config');

const payment = async (req, res) => {
  try {
    let { amount, total_purchase_time, total_consume_time, lastest_purchase_time, reamining_time
    } = req.body;

    const instance = new Razorpay({ key_id: "rzp_test_O2LTVEnKnnAgH3", key_secret: "rtIwj9ATwIhCqQdrELrrKZfA" });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'reciept#1',
      notes: {
        total_purchase_time,
        total_consume_time,
        lastest_purchase_time,
        reamining_time
      }
    })

    res.status(201).json({
      success: true,
      order,
      amount
    });
  } catch (error) {
    defaultLogger(`ERROR WHILE REDIRECTION >>> ${error}`, null, 'error');
    throw error;
  }
};

module.exports = { payment };
