const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')
// Temp comment

class AccountRequestProduct extends BaseModel {
  constructor(data) {
    super(AccountRequestProduct.props(), AccountRequestProduct.relations(), data)
  }

