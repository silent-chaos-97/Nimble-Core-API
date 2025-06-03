const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class Application extends BaseModel {
  constructor(data) {
    super(Application.props(), Application.relations(), data)
  }

