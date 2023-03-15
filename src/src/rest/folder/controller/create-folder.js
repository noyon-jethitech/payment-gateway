const { models } = require('../../../models/index');
const { getMessage } = require('../../../utils/messages');
const folderLogger = require('../folder-logger');

const createLink = async (req, res) => {
  try {
    const { folderName } = req.body;
    const {
      folder: FolderModel,
      workspace: WorkspaceModel,
    } = models;

    const { workspaceId } = req.workspace;

    const folderInstance = await FolderModel.findAndCountAll({
      where: { $and: [{ folderName }, { workspaceId }] },
    });

    if (folderInstance.count > 0) {
      throw new Error(getMessage('UNIQUE_FOLDER_NAME'));
    }

    const workspaceInstance = await WorkspaceModel.findOne({
      where: { id: workspaceId },
    });

    const inputObj = {
      folderName,
      workspaceId,
      createdBy: workspaceInstance.userId,
    };

    // eslint-disable-next-line prefer-const
    const newFolder = await FolderModel.create(inputObj, { returning: true });

    const response = {
      folder: newFolder,
      message: getMessage('FOLDER_CREATE_SUCCESS'),
    };

    return res.send(response);
  } catch (error) {
    folderLogger(`ERROR WHILE CREATE FOLDER>> ${error}`, req, 'error');
    return res.status(500).send(error.message);
  }
};

module.exports = createLink;
