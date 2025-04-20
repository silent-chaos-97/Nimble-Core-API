exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
