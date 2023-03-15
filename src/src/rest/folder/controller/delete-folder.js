const { getMessage } = require('../../../utils/messages');
const { models } = require('../../../models/index');
const folderLogger = require('../folder-logger');

const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const {
      folder: FolderModel,
    } = models;

    const { workspaceId } = req.workspace;

    const folderInstance = await FolderModel.findOne({
      where: { $and: [{ id: folderId }, { workspaceId }, { isDefault: false }] },
    });

    if (!folderInstance) {
      throw new Error(getMessage('FOLDER_NOT_FOUND'));
    }

    await FolderModel.destroy({
      where: { id: folderInstance.id },
    });

    const response = {
      status: 'SUCCESS',
      message: getMessage('FOLDER_DELETE_SUCCESS'),
    };

    return res.send(response);
  } catch (error) {
    folderLogger(`ERROR WHILE DELETE FOLDER>> ${error}`, req, 'error');
    return res.status(500).send(error.message);
  }
};

module.exports = deleteFolder;
