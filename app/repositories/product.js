const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'products',
  requireFetch: false,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
