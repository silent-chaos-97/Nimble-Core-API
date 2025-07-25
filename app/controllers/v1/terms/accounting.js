const _ = require('lodash')
const app = require('../../../core')
const nimbleData = app.plugins.nimbleData

  const search = _.get(req, 'params.term') || _.get(req, 'params.category')
