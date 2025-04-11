const _ = require('lodash')
const defaultSerializer = require('../serializer')
const app = require('../../core')


function serializer(data) {
  return _.merge(defaultSerializer(properties, data), {
    _refLink: `${app.config.get('protocol')}://${app.config.get('frontend.onboarding_domain')}/${data.institution ? data.institution.domain : ''}/onboarding/?_rbid=${data.id}`
  })
