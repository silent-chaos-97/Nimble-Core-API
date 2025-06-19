//const _ = require('lodash')
const BaseModel = require('./model')

class IdentityModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(IdentityModel.props(), IdentityModel.relations(), data)
  }

