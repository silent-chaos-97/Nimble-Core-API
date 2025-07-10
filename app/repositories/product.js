const app = require('../core')

const Product = app.db.Model.extend({
  tableName: 'products',
  hasTimestamps: true,

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
  },
