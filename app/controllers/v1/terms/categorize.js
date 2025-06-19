const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData
const BadRequestError = require('../../../errors/bad_request')

module.exports = async(req, res) => {
  const category = _.get(req, 'params.category') || _.get(req, 'body.category')

  if (!category) return Promise.reject(new BadRequestError(`CategoryRequired: /terms/:category`))

