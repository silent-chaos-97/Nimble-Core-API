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
