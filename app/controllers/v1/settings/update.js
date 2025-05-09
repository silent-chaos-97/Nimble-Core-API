const app = require('../../../core')
const _ = require('lodash')

async function update(req, res, next) {
  return app.services.settings.update({
    institutionId: _.get(req, ['params', 'id'], _.get(req, ['user', 'institutionId'])),
    key: req.params.key, data: req.body
  }).then(settings => res.status(200).json(settings))
    .catch(next)
