const dns = require('dns');
const defaultLogger = require('../logger');
const CONFIG = require('../../config/config');

const isDomainVerified = domainName => new Promise(resolve => {
  dns.lookup(domainName, (err, address) => {
    if (address === CONFIG.baseDomainIP) {
      defaultLogger(`CUSTOM_DOMAIN_VERIFIED => ${domainName} ${address}`);
      resolve('VERIFIED');
    }
    defaultLogger(`CUSTOM_DOMAIN_UNVERIFIED => ${domainName} ${address}`);
    resolve('UNVERIFIED');
  });
});

module.exports = isDomainVerified;
