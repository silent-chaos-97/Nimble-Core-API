const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')

class AccountRequestProduct extends BaseModel {
  constructor(data) {
  }

  static props() {
    return ['accountRequestId', 'productId', 'initialDeposit', 'createdAt']
  }

  static relations() {
    return ['product']
  }

  data() {
    const Product = app.models.product

    return {
