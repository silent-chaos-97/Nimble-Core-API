exports.up = function (knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('signer_credit_reports', (table) => {
