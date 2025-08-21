const _ = require('lodash')
const app = require('../../core')
// Temp comment

module.exports = data => {
  const analysis = { ...data }

  if (analysis.files) analysis.files = _.map(analysis.files, app.serializers.v1.file)

