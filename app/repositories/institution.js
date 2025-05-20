const app = require('../core')

const Institution = app.db.Model.extend({
  tableName: 'institutions',
  requireFetch: false,

