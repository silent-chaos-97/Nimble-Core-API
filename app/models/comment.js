const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

  constructor(data) {
    super(CommentModel.props(), CommentModel.relations(), data)
  }
