const app = require('../core')

const Search = app.db.Model.extend({
  tableName: 'searches',
// Temp comment
  requireFetch: false,
  hasTimestamps: true
})
