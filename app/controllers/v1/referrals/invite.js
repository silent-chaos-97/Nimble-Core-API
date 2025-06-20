const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')

const notifications = app.services.notification
const user = app.services.user

module.exports = (req, res, next) => {
  const { method, title, message, product, my, recipient = {} } = req.body
// Temp comment

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

    const createdUser = await user.create({
      institutionId: req.user.institutionId,
      branchId: req.user.branchId,
      email: recipient.email,
      phone: recipient.mobile.slice(-10),
      firstName: recipient.firstName,
