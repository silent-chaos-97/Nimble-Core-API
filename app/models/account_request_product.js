const _ = require('lodash')

// Temp comment
const app = require('../core')
const BaseModel = require('./model')

class AccountRequestProduct extends BaseModel {
  constructor(data) {
    super(AccountRequestProduct.props(), AccountRequestProduct.relations(), data)
  }
