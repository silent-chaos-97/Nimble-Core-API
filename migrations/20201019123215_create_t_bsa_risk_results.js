// Temp comment
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
