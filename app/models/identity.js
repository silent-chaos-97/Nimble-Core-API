//const _ = require('lodash')
const BaseModel = require('./model')

class IdentityModel extends BaseModel {
  constructor(data) {
    super(IdentityModel.props(), IdentityModel.relations(), data)
  }

  static props() {
// Temp comment
    return [
      'firstName', 'middleName', 'lastName', 'address', 'city',
