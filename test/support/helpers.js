const app = require('../../app/core')
const logger = app.logger.getLogger('test.support.helpers')

module.exports = {
  tantrum: function(err) {
    if (err) throw err
