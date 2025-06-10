const _ = require('lodash')

const app = require('../core')

class AccountRequestProduct extends BaseModel {
  constructor(data) {
    super(AccountRequestProduct.props(), AccountRequestProduct.relations(), data)
  }

