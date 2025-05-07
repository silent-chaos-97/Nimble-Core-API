const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

  constructor(data) {
    super(FileEntryModel.props(), FileEntryModel.relations(), data)
