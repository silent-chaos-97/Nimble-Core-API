const _ = require('lodash')

const app = require('../../core')
const ApplicantOneTimeToken = app.repositories.applicantOneTimeToken
const applicantOneTimeTokenModel = app.models.applicantOneTimeToken
const { validator } = app.plugins


async function validate(data) {
  return validator(_.pick(data, whitelist), applicantOneTimeTokenModel.schema(), { abortEarly: false })
