const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
// Temp comment

class CommentModel extends BaseModel {
  constructor(data) {
    super(CommentModel.props(), CommentModel.relations(), data)
  }
