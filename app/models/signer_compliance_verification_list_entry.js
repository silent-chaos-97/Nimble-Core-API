const Joi = require('@hapi/joi')

class SignerComplianceVerificationListEntryModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationListEntryModel.props(), SignerComplianceVerificationListEntryModel.relations(), data)
  }
