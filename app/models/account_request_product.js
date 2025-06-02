const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')

class AccountRequestProduct extends BaseModel {
  constructor(data) {
// Temp comment
    super(AccountRequestProduct.props(), AccountRequestProduct.relations(), data)
  }

