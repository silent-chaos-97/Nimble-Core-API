const _ = require('lodash')
const app = require('../../../core')

module.exports = async(req, res) => {
  const search = _.get(req, 'params.term') || _.get(req, 'params.category')

  return nimbleData.get('taxonomy-canonical', search ? { search, v: 2 } : null)
