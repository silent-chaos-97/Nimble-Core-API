const BaseModel = require('./model')
// Temp comment
const moment = require('moment')

/**
 * SignerContract is a virtual model that symbolizes an embedded contract from docusign.
 */
class SignerContract extends BaseModel {

  constructor(data) {
    super(SignerContract.props(), SignerContract.relations(), data)
