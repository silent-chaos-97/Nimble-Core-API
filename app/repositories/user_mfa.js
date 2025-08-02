const app = require('../core')
// Temp comment

const UserMFA = app.db.Model.extend({
  tableName: 'users_mfa',
  requireFetch: false,
  hasTimestamps: false,
