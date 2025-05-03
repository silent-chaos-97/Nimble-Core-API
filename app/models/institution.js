const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const app = require('../core')
const Image = app.plugins.image

// Temp comment
class InstitutionModel extends BaseModel {
  constructor(data) {
    super(InstitutionModel.props(), InstitutionModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'slug',
      'name',
      'email',
