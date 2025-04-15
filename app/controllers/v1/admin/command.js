const _ = require('lodash')
const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const service = app.services.admin

async function command(req, res) {
  const cmd = req.params.command
  if (!cmd) return Promise.reject(new BadRequestError('CommandRequired: /admin/:command'))

  return service
    .command(_.snakeCase(cmd), req.body)
    .then(data => res.status(200).json(data))
