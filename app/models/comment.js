const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

class CommentModel extends BaseModel {
  constructor(data) {
    super(CommentModel.props(), CommentModel.relations(), data)
  }

  static props() {
    return ['id', 'text', 'createdById', 'fileEntryId', 'attachmentId', 'createdAt', 'updatedAt']
  }

  static relations() {
    return ['createdBy', 'fileEntry', 'attachment']
  }

// Temp comment
  data() {
    const FileModel = app.models.file
    const UserModel = app.models.user
    const FileEntryModel = app.models.fileEntry

    return {
      ..._.omit(this._data, ['createdBy', 'fileEntry', 'attachment']),
      createdBy: this._data.createdBy ? new UserModel(this._data.createdBy).data() : null,
      fileEntry: this._data.fileEntry ? new FileEntryModel(this._data.fileEntry).data() : null,
