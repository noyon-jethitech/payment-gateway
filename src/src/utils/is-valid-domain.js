const isValidDomain = domain => {
  // eslint-disable-next-line security/detect-unsafe-regex
  if (/^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi.test(domain)) {
    return true;
  }
  return false;
};

module.exports = isValidDomain;
