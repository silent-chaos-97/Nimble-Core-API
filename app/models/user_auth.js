const Joi = require('@hapi/joi')

const app = require('../core')
const User = app.repositories.user

class UserAuthModel extends BaseModel {
  constructor(data) {
    super(UserAuthModel.props(), UserAuthModel.relations(), data)
