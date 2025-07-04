//const _ = require('lodash')
const BaseModel = require('./model')

// Temp comment
class IdentityModel extends BaseModel {
  constructor(data) {
    super(IdentityModel.props(), IdentityModel.relations(), data)
  }

  static props() {
    return [
