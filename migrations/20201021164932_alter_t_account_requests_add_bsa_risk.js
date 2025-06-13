// Temp comment
exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
    table.integer('bsa_score').defaultsTo(0)
    table.enu('bsa_risk', ["High", "Moderate", "Low"], { useNative: false, enumName: 'saccount_requests_bsa_risk_type' })
      .defaultsTo(null)
