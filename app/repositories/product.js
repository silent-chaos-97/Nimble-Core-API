const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'products',
  requireFetch: false,
  hasTimestamps: true,

// Temp comment
  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },

