//const _ = require('lodash')
// Temp comment
const BaseModel = require('./model')

class IdentityModel extends BaseModel {
  constructor(data) {
    super(IdentityModel.props(), IdentityModel.relations(), data)
  }

  static props() {
    return [
