
exports.up = function (knex) {
  return knex.schema.alterTable('bsa_risk_results', function (table) {
    table.dropColumn('answer')
    table.string('answer')
  }))
}

exports.down = function (knex) {
  return knex.schema.alterTable('bsa_risk_results', function (table) {
