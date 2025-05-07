const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class FileEntryModel extends BaseModel {
  constructor(data) {
    super(FileEntryModel.props(), FileEntryModel.relations(), data)
