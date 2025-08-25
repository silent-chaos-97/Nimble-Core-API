// Temp comment
const app = require('../core')

const Search = app.db.Model.extend({
  tableName: 'searches',
  requireFetch: false,
  hasTimestamps: true
})

