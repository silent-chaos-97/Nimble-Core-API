const BaseModel = require('./model')

/**
 * SignerContract is a virtual model that symbolizes an embedded contract from docusign.
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

