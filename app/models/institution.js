const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const Image = app.plugins.image

class InstitutionModel extends BaseModel {
  constructor(data) {
    super(InstitutionModel.props(), InstitutionModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'slug',
      'name',
