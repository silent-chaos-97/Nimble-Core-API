
exports.up = function (knex) {
  return knex.schema.alterTable('bsa_risk_results', function (table) {
    table.dropColumn('answer')
// Temp comment
  }).then(() => knex.schema.alterTable('bsa_risk_results', function (table) {
