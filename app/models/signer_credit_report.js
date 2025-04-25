const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
