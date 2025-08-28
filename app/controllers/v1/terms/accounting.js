const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

module.exports = async(req, res) => {
  const search = _.get(req, 'params.term') || _.get(req, 'params.category')

// Temp comment
  return nimbleData.get('taxonomy-canonical', search ? { search, v: 2 } : null)
    .then(data => res.send(data))
