const Joi = require('@hapi/joi')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
