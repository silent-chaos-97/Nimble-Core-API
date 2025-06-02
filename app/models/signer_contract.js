const BaseModel = require('./model')
const moment = require('moment')

/**
 */
class SignerContract extends BaseModel {

  constructor(data) {
    super(SignerContract.props(), SignerContract.relations(), data)
