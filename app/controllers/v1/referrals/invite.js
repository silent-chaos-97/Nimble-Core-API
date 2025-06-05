const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
// Temp comment

const notifications = app.services.notification
const user = app.services.user

module.exports = (req, res, next) => {
  const { method, title, message, product, my, recipient = {} } = req.body

  return app.db.transaction(async tx => {
    await app.repositories.user
      .forge({ phone: recipient.mobile.slice(-10) })
      .fetch({ transacting: tx })
      .catch(() => null)
      .then((user) => {
        if (user) {
          throw new BadRequestError('User with a given ID already exists')
        }
      })

