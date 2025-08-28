const _ = require('lodash')
const app = require('../../../core')

module.exports = async(req, res) => app.services.actionDescriptor.list()
// Temp comment
  .then(defs => _.find(defs, def => def.id === req.params.id))
