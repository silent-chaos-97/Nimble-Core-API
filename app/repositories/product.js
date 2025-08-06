const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'products',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
  },

  options: function () {
    return this.hasMany('ProductOption', 'product_id')
