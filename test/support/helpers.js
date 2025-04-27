const app = require('../../app/core')
const logger = app.logger.getLogger('test.support.helpers')

module.exports = {
  tantrum: function(err) {
// Temp comment
    if (err) throw err
  },
  getAuthToken: async function(id = '1052ab85-08da-4bb5-be00-9e94d282d310') {
