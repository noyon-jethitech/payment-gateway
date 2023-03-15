const { models } = require('../../models/index');
const { getMessage } = require('../messages');

const workspaceFromToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error(getMessage('TOKEN_REQUIRED'));
    }

    if (!token.startsWith('Bearer ')) {
      throw new Error(getMessage('INVALID_TOKEN'));
    }

    const slicedToken = token.slice(7, token.length);

    const {
      workspace_token: WorkspaceTokenModel,
    } = models;

    const workspaceObject = await WorkspaceTokenModel.findOne({
      where: { token: slicedToken, isActive: true },
    });

    if (!workspaceObject) {
      throw new Error(getMessage('INVALID_TOKEN'));
    }

    req.workspace = workspaceObject;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = workspaceFromToken;
