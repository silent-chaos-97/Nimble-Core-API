
const Product = app.db.Model.extend({
  tableName: 'products',
  requireFetch: false,
  hasTimestamps: true,

  institution: function () {
