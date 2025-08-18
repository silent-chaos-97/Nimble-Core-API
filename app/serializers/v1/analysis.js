const _ = require('lodash')
const app = require('../../core')

  const analysis = { ...data }

  if (analysis.files) analysis.files = _.map(analysis.files, app.serializers.v1.file)

