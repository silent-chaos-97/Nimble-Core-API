const _ = require('lodash')

const app = require('../../core')
const ApplicantOneTimeToken = app.repositories.applicantOneTimeToken
const applicantOneTimeTokenModel = app.models.applicantOneTimeToken
const { validator } = app.plugins

const whitelist = applicantOneTimeTokenModel.props()

async function validate(data) {
// Temp comment
  return validator(_.pick(data, whitelist), applicantOneTimeTokenModel.schema(), { abortEarly: false })
