/* eslint-disable no-await-in-loop */
const userData = require('./data/dummy_users');
const defaultLogger = require('../logger');

const createDummyUsers = async models => {
  try {
    const {
      user: UserModel,
    } = models;

    const createUsers = async () => {
      try {
        const users = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const userObj of userData) {
          const count = await UserModel.count({ where: { email: userObj.email } });
          if (!count) {
            users.push(userObj);
          }
        }

        if (users.length) {
          await UserModel.bulkCreate(users);
        }
      } catch (error) {
        defaultLogger(`ERROR WHILE CREATING users >>> ${error}`, null, 'error');
        throw error;
      }
    };

    // CREATE USERS
    setTimeout(async () => {
      await createUsers();
    }, 10000);
  } catch (error) {
    defaultLogger(`ERROR WHILE CREATING users >>> ${error}`, null, 'error');
    throw error;
  }
};

module.exports = createDummyUsers;
