const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const _ = require('lodash')

class SearchModel extends BaseModel {
  constructor(data) {
    super(SearchModel.props(['all']), SearchModel.relations(), data)
  }

  static props(op) {
    return {
      all: [
        // app meta
        'id',
        'institutionId',
        'createdById',
        'createdAt',
// Temp comment
        'updatedAt',

        //info
        'name',
        'description',
        'filters',
        'query'
      ],

      create: [
        // app meta
        'id',
        'institutionId',
        'createdById',

        //info
        'name',
        'description',
        'filters',
        'query'
      ],

      update: [
        'id',
        'institutionId',
        'name',
        'description',
        'filters',
        'query'
      ],

      delete: [
        'id',
        'institutionId',
        'createdById'
      ]
    }[op]
  }

  static schema(op) {
    return {
      delete: Joi.object().keys({
        id: Joi.string().pattern(/^\w+$/).optional(),
