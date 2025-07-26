const _ = require('lodash')
const nimbleData = app.plugins.nimbleData

module.exports = async(req, res) => {
  const search = _.get(req, 'params.term') || _.get(req, 'params.category')
