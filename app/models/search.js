const Joi = require('@hapi/joi')
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
        'updatedAt',

        //info
        'name',
        'description',
