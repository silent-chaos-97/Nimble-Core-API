const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
