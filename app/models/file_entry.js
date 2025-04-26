const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

class FileEntryModel extends BaseModel {
