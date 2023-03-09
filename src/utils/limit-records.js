const CONFIG = require('../../config/config');

const limitRecords = (filter, DEFAULT, MAX) => {
  DEFAULT = DEFAULT || CONFIG.queryPagingMinCount;
  MAX = MAX || CONFIG.queryPagingMaxCount;
  if (!filter.skip) {
    filter.skip = 0;
  }
  if (!filter.limit) {
    filter.limit = DEFAULT;
  }
  if (filter.limit > MAX) {
    filter.limit = MAX;
  }
};

module.exports = limitRecords;
