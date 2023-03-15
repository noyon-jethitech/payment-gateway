const { models } = require('../../../models/index');
const { getMessage } = require('../../../utils/messages');
const folderLogger = require('../folder-logger');

const updateFolder = async (req, res) => {
  try {
    const { params, body, workspace } = req;
    const { folderId } = params;
    const { newFolderName } = body;
    const {
      folder: FolderModel,
    } = models;

    if (!newFolderName) {
      throw new Error(getMessage('NEW_FOLDER_NAME_REQUIRED'));
    }

    const { workspaceId } = workspace;

    const currentFolderInstance = await FolderModel.findOne({
      where: { $and: [{ id: folderId }, { workspaceId }] },
    });

    if (!currentFolderInstance) {
      throw new Error(getMessage('CURRENT_FOLDER_NOT_FOUND'));
    }

    const newFolderInstance = await FolderModel.findAndCountAll({
      where: { $and: [{ folderName: newFolderName }, { workspaceId }] },
    });

    if (newFolderInstance.count > 0) {
      throw new Error(getMessage('NEW_UNIQUE_FOLDER_NAME'));
    }

    const inputObj = {
      folderName: newFolderName,
    };

    // eslint-disable-next-line prefer-const
    await FolderModel.update(inputObj, {
      where: { id: currentFolderInstance.id },
    });

    const response = {
      folderName: newFolderName,
      message: getMessage('FOLDER_UPDATE_SUCCESS'),
    };

    return res.send(response);
  } catch (error) {
    folderLogger(`ERROR WHILE UPDATE FOLDER>> ${error}`, req, 'error');
    return res.status(500).send(error.message);
  }
};

module.exports = updateFolder;
