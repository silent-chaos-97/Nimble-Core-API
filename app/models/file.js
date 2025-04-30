const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class FileModel extends BaseModel {
  constructor(data) {
    super(FileModel.props('all'), FileModel.relations(), data)
  }

  static props(op) {
    return {
      all: [
