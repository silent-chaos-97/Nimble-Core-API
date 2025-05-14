const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class FileModel extends BaseModel {
  constructor(data) {
    super(FileModel.props('all'), FileModel.relations(), data)
  }

  static props(op) {
    return {
      all: [
        // app meta
        'id',
        'createdById',
        'createdByRole',
        'createdAt',
        'updatedAt',
