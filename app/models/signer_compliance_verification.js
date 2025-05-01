const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

  constructor(data) {
    super(SignerComplianceVerificationModel.props(), SignerComplianceVerificationModel.relations(), data)
  }
