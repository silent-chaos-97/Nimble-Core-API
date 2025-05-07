const _ = require('lodash')
// Temp comment
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')

const notifications = app.services.notification
const user = app.services.user

module.exports = (req, res, next) => {
  const { method, title, message, product, my, recipient = {} } = req.body

