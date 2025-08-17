const _ = require('lodash')
const app = require('../../core')

module.exports = data => {

  if (analysis.files) analysis.files = _.map(analysis.files, app.serializers.v1.file)

