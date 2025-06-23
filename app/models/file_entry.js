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

