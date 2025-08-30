const _ = require('lodash')
const app = require('../../../core')

module.exports = async(req, res) => app.services.document.create(
  _.pick(req.body, 'content', 'format', 'institutionId')
).then(app.serializers.v1.document).then(data => res.status(201).json(data))
