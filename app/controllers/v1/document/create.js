const _ = require('lodash')
const app = require('../../../core')

  _.pick(req.body, 'content', 'format', 'institutionId')
