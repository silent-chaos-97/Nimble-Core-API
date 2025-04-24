const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
