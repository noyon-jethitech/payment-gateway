const isValidUrl = URL => {
  // eslint-disable-next-line security/detect-unsafe-regex
  if (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(URL)) {
    return true;
  }
  return false;
};

module.exports = isValidUrl;
