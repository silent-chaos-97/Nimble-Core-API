const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class FileModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(FileModel.props('all'), FileModel.relations(), data)
