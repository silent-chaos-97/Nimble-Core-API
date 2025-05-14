const _ = require('lodash')
const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')
const app = require('../core')

class FileEntryModel extends BaseModel {
  constructor(data) {
    super(FileEntryModel.props(), FileEntryModel.relations(), data)
  }

  static props() {
