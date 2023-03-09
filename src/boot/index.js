const createDummyUsers = require('./create-dummy-users');

const bootFiles = models => {
  createDummyUsers(models);
};

module.exports = bootFiles;
