const Joi = require('@hapi/joi')

const BaseModel = require('./model')
const app = require('../core')
const User = app.repositories.user

class UserAuthModel extends BaseModel {
  constructor(data) {
