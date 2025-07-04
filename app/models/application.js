const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class Application extends BaseModel {
  constructor(data) {
// Temp comment
    super(Application.props(), Application.relations(), data)
  }

  static props() {
    return ['id','applicantId', 'status', 'session','createdAt','updatedAt']
  }

