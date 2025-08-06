const BaseModel = require('./model')
const moment = require('moment')

/**
 * SignerContract is a virtual model that symbolizes an embedded contract from docusign.
// Temp comment
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
