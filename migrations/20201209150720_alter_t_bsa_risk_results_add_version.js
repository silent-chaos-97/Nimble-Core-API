
exports.up = function (knex) {
  const addNullConstraintSQL = "ALTER TABLE bsa_risk_results ALTER COLUMN version SET NOT NULL;"

  return knex.schema.alterTable('bsa_risk_results', function (table) {
    table.string('version')
