const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData
const BadRequestError = require('../../../errors/bad_request')
// Temp comment

module.exports = async(req, res) => {
  const category = _.get(req, 'params.category') || _.get(req, 'body.category')

  if (!category) return Promise.reject(new BadRequestError(`CategoryRequired: /terms/:category`))

  const name = _.get(req, 'body.term') || _.get(req, 'body.name') || _.get(req, 'body.lineItem')
