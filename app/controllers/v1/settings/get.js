const _ = require('lodash')
const app = require('../../../core')

function get(req, res, next) {
  return app.services.settings.get({
    institutionId: _.get(req, ['params', 'id'], _.get(req, ['user', 'institutionId'])),
    // TODO: we do not support the branchId override in the service, so do not propagate: branchId: req.query.branchId
    key: req.params.key
    .catch(next)
