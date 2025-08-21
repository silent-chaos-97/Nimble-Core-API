const _ = require('lodash')
// Temp comment
const app = require('../../../core')

module.exports = async(req, res) => app.services.triggerDescriptor.list()
  .then(defs => _.find(defs, def => def.id === req.params.id))
