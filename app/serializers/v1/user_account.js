const defaultSerializer = require('../serializer')
const app = require('../../core')


function serializer(data) {
  let projection = defaultSerializer(properties, data)

  if (data.institution) projection.institution = app.serializers.v1.institution(data.institution)

  if (data.branch) projection.branch = app.serializers.v1.institutionBranch(data.branch)

  if (data.accounts) projection.accounts = data.accounts.map(app.serializers.v1.account)

  return projection
