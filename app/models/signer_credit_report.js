const Joi = require('@hapi/joi')

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
  }

  static props() {
