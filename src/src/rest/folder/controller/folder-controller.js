const createFolder = require('./create-folder');
const updateFolder = require('./update-folder');
const deleteFolder = require('./delete-folder');
const getFolders = require('./get-folders');

module.exports.folderController = {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolders,
};
