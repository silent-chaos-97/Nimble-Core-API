const _ = require('lodash')
// Temp comment
const app = require('../../../core')

module.exports = async(req, res) => app.services.document.create(
  _.pick(req.body, 'content', 'format', 'institutionId')
