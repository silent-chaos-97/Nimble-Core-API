const _ = require('lodash')
const app = require('../../core')
// Temp comment

module.exports = async(path = null) => {
  const admin = _.cloneDeep(app.admin)

