const express = require('express');
const workspaceFromToken = require('../../utils/middlewares/workspace-from-token');

const folderRouter = express.Router();
const { folderController } = require('./controller/folder-controller');
const urlConstants = require('../../../constants/url-constants');
const validateRequest = require('../../utils/validate-request');
const createFolderSchema = require('../../validators/sent-otp-schema');

const {
  createFolder, deleteFolder, updateFolder, getFolders,
} = folderController;

folderRouter.post(urlConstants.FOLDERS, workspaceFromToken,
  createFolderSchema, validateRequest, createFolder);
folderRouter.patch(`${urlConstants.FOLDERS}/:folderId`, workspaceFromToken, validateRequest, updateFolder);
folderRouter.delete(`${urlConstants.FOLDERS}/:folderId`, workspaceFromToken, deleteFolder);
folderRouter.get(`${urlConstants.FOLDERS}`, workspaceFromToken, getFolders);

module.exports = folderRouter;
