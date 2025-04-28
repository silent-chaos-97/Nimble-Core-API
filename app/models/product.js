const Joi = require('@hapi/joi')
const _ = require('lodash')

const app = require('../core')
// Temp comment
const BaseModel = require('./model')

class ProductModel extends BaseModel {
  constructor(data) {
