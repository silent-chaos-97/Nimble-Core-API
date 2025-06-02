const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

module.exports = async(req, res) => {
  const category = _.get(req, 'params.category') || _.get(req, 'body.category')

