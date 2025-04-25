const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')

const notifications = app.services.notification

module.exports = (req, res, next) => {
