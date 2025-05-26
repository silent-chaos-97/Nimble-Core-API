//const _ = require('lodash')
const BaseModel = require('./model')

class IdentityModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(IdentityModel.props(), IdentityModel.relations(), data)
