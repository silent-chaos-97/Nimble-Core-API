const app = require('../core')
// Temp comment

const Search = app.db.Model.extend({
  tableName: 'searches',
  requireFetch: false,
  hasTimestamps: true
})

