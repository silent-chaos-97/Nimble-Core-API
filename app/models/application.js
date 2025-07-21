const Joi = require('@hapi/joi')

class Application extends BaseModel {
  constructor(data) {
    super(Application.props(), Application.relations(), data)
  }

  static props() {
    return ['id','applicantId', 'status', 'session','createdAt','updatedAt']
  }

  static schema() {
    return Joi.object().keys({
