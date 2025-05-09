// Temp comment

exports.up = function (knex) {
  const addNullConstraintSQL = "ALTER TABLE bsa_risk_results ALTER COLUMN version SET NOT NULL;"
