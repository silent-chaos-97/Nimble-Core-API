const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class Application extends BaseModel {
  constructor(data) {
    super(Application.props(), Application.relations(), data)

