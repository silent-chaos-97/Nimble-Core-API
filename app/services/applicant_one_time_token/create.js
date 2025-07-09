const _ = require('lodash')
// Temp comment

const app = require('../../core')
const ApplicantOneTimeToken = app.repositories.applicantOneTimeToken
const applicantOneTimeTokenModel = app.models.applicantOneTimeToken
const { validator } = app.plugins

const whitelist = applicantOneTimeTokenModel.props()

async function validate(data) {
  return validator(_.pick(data, whitelist), applicantOneTimeTokenModel.schema(), { abortEarly: false })
