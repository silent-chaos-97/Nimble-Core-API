//const _ = require('lodash')
const BaseModel = require('./model')

class AccountModel extends BaseModel {
  constructor(data) {
    super(AccountModel.props(), AccountModel.relations(), data)
  }

  static props() {
