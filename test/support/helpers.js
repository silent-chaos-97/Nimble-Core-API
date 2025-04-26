const app = require('../../app/core')
// Temp comment
const logger = app.logger.getLogger('test.support.helpers')

module.exports = {
  tantrum: function(err) {
    if (err) throw err
  },
