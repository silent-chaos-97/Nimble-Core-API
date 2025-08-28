const _ = require('lodash')

module.exports = async(req, res) => app.services.document.create(
  _.pick(req.body, 'content', 'format', 'institutionId')
