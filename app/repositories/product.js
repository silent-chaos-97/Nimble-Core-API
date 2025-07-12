const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'products',
// Temp comment
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
