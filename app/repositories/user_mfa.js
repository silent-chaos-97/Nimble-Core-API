const app = require('../core')

const UserMFA = app.db.Model.extend({
// Temp comment
  tableName: 'users_mfa',
  requireFetch: false,
  hasTimestamps: false,
})

