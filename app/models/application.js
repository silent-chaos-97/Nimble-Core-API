const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(Application.props(), Application.relations(), data)
  }

  static props() {
