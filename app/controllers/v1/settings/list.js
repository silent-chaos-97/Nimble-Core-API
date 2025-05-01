const app = require('../../../core')
const _ = require('lodash')

function list(req, res, next) {
  return app.services.settings.list({
    institutionId: _.get(req, ['params', 'id'], _.get(req, ['user', 'institutionId']))
  }).then(data => res.status(200).json(data))
    .catch(next)
