const BaseModel = require('./model')
const moment = require('moment')

/**
 */
class SignerContract extends BaseModel {

  constructor(data) {
    super(SignerContract.props(), SignerContract.relations(), data)
  }

  static props() {
    return [
      'url',
      'expiresAt'
    ]
  }

  data() {
    return {
      ...this._data,
      expiresAt: moment().add(5, 'minutes').toISOString()
    }
