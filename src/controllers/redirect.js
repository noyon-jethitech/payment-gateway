const { getName } = require('country-list');
const defaultLogger = require('../logger');
const { models } = require('../models/index');
const CONFIG = require('../../config/config');

const redirectLink = async (req, res) => {
  try {
    const { shortLink } = req.params;
    const { link_model: LinkModel, analytics: AnalyticsModel } = models;

    const linkInstance = await LinkModel.findOne({
      where: { shortLink },
      attributes: [
        'id',
        'domain',
        'domainStatus',
        'destinationLink',
        'redirectStatus',
        'ogTitle',
        'ogDescription',
        'ogImage',
      ],
    });

    const errorPage = `${CONFIG.clientUrl}/error`;

    if (!linkInstance) {
      return res.redirect(errorPage);
    }

    // eslint-disable-next-line eqeqeq
    if (linkInstance.redirectStatus !== 'ENABLE') {
      return res.redirect(errorPage);
    }

    if (req.headers.host !== CONFIG.baseDomain) {
      if (linkInstance.domain !== req.headers.host || linkInstance.domainStatus === 'UNVERIFIED') {
        return res.redirect(errorPage);
      }
    }

    const {
      ogTitle, ogDescription, ogImage, destinationLink,
    } = linkInstance;

    if (!ogImage) {
      res.redirect(destinationLink);
    } else {
      res.render('index', {
        ogTitle, ogDescription, ogImage, destinationLink,
      });
    }

    if (req.useragent.isBot) {
      return true;
    }

    if (req.useragent.isDesktop) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'Desktop',
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    } else if (req.useragent.isMobile) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'Mobile',
          Platform: req.useragent.platform,
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    } else if (req.useragent.isIphone) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'Mobile',
          Platform: req.useragent.platform,
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    } else if (req.useragent.isIpad) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'Ipad',
          Platform: req.useragent.platform,
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    } else if (req.useragent.isMac) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'IMac',
          Platform: req.useragent.platform,
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    } else if (req.useragent.isTablet) {
      const newLinkObj = {
        linkId: linkInstance.id,
        clicks: 1,
        country: req.ipInfo?.country && getName(req.ipInfo?.country),
        devices: {
          Device: 'Tablet',
          Platform: req.useragent.platform,
        },
        browsers: {
          browser: req.useragent.browser,
        },
        operatingSystem: {
          os: req.useragent.os,
        },
      };
      await AnalyticsModel.create(newLinkObj);
    }

    return true;
  } catch (error) {
    defaultLogger(`ERROR WHILE REDIRECTION >>> ${error}`, null, 'error');
    throw error;
  }
};

const redirectQuickLink = async (req, res) => {
  try {
    const { shortLink } = req.params;
    const { quick_link: QuickLink } = models;

    const linkInstance = await QuickLink.findOne({
      where: { shortLink },
      attributes: [
        'id',
        'domain',
        'domainStatus',
        'destinationLink',
        'redirectStatus',
        'ogTitle',
        'ogDescription',
        'ogImage',
      ],
    });

    const errorPage = `${CONFIG.clientUrl}/error`;

    if (!linkInstance) {
      return res.redirect(errorPage);
    }

    // eslint-disable-next-line eqeqeq
    if (linkInstance.redirectStatus !== 'ENABLE') {
      return res.redirect(errorPage);
    }

    if (req.headers.host !== CONFIG.baseDomain) {
      if (linkInstance.domain !== req.headers.host || linkInstance.domainStatus === 'UNVERIFIED') {
        return res.redirect(errorPage);
      }
    }

    const {
      ogTitle, ogDescription, ogImage, destinationLink,
    } = linkInstance;

    if (!ogImage) {
      res.redirect(destinationLink);
    } else {
      res.render('index', {
        ogTitle, ogDescription, ogImage, destinationLink,
      });
    }

    return true;
  } catch (error) {
    defaultLogger(`ERROR WHILE REDIRECTION >>> ${error}`, null, 'error');
    throw error;
  }
};

module.exports = { redirectLink, redirectQuickLink };
