const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

class FileEntryModel extends BaseModel {
  constructor(data) {
    super(FileEntryModel.props(), FileEntryModel.relations(), data)
  }

  static props() {
    return ['id', 'name', 'isFile', 'size', 'mimetype', 'createdById', 'parentId', 'fileId', 'createdAt', 'updatedAt']
  }

  static relations() {
    return ['createdBy', 'parent', 'file']
  }

  data() {
    const FileModel = app.models.file
    const UserModel = app.models.user
    const FileEntryModel = app.models.fileEntry

    return {
      ..._.omit(this._data, ['owner', 'parent', 'file']),
      createdBy: this._data.createdBy ? new UserModel(this._data.createdBy).data() : null,
      parent: this._data.parent ? new FileEntryModel(this._data.parent).data() : null,
      file: this._data.file ? new FileModel(this._data.file).data() : null
    }
  }

  static schema() {
    return Joi.object().keys({
      id: Joi.string().uuid(),
      createdById: Joi.string().uuid().required(),
      parentId: Joi.string().uuid(),
      fileId: Joi.string().uuid(),
      name: Joi.string(),
      isDir: Joi.boolean(),
