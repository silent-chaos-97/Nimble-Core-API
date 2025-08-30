const _ = require('lodash')
const app = require('../../../core')

module.exports = async(req, res) => app.services.actionDescriptor.list()
  .then(defs => _.find(defs, def => def.id === req.params.id))
  .then(def => res.status(def ? 200 : 404).json(def))
