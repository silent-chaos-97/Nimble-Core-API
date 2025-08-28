const _ = require('lodash')
const app = require('../../core')

  const admin = _.cloneDeep(app.admin)

  return !_.isString(path) ? { admin } : _.get(admin, path)
