/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const limitRecords = require('../../../utils/limit-records');
const folderLogger = require('../folder-logger');
const { models } = require('../../../models/index');

const getFolders = async (req, res) => {
  try {
    const { query, workspace } = req;

    limitRecords(query);

    const { skip, limit } = query;

    const {
      user: UserModel,
      folder: FolderModel,
    } = models;

    const { workspaceId } = workspace;

    const folderInstanceCount = await FolderModel.count({
      where: { workspaceId },
    });

    const folderInstance = await FolderModel.findAll({
      offset: skip,
      limit,
      where: { workspaceId },
      include: [
        {
          model: UserModel,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email', 'profileImage'],
        },
      ],
      attributes: {
        exclude: ['workspaceId', 'createdBy'],
      },
    });

    const response = {
      count: folderInstanceCount,
      data: folderInstance,
    };

    return res.send(response);
  } catch (error) {
    folderLogger(`ERROR WHILE FETCHING FOLDER >> ${error}`, req, 'error');
    return res.status(500).send(error.message);
  }
};

module.exports = getFolders;
