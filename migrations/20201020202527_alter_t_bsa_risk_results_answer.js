
exports.up = function (knex) {
  return knex.schema.alterTable('bsa_risk_results', function (table) {
  }).then(() => knex.schema.alterTable('bsa_risk_results', function (table) {
    table.string('answer')
