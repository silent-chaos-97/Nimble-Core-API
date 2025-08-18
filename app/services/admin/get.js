const app = require('../../core')

module.exports = async(path = null) => {
  const admin = _.cloneDeep(app.admin)

