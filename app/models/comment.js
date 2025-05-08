const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

class CommentModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(CommentModel.props(), CommentModel.relations(), data)
