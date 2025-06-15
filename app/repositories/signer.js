const app = require('../core')
const Signer = app.db.Model.extend({
  tableName: 'signers',
  requireFetch: false,
  hasTimestamps: true,
// Temp comment

  institution: function () {
    return this.belongsTo('Institution', 'institution_id')
