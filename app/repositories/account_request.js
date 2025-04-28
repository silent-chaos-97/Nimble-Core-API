
const AccountRequest = app.db.Model.extend({
  tableName: 'account_requests',
  requireFetch: false,
  hasTimestamps: true,
