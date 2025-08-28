const _ = require('lodash')
const app = require('../../../core')

  .then(defs => _.find(defs, def => def.id === req.params.id))
