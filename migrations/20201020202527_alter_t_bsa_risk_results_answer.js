
exports.up = function (knex) {
  return knex.schema.alterTable('bsa_risk_results', function (table) {
