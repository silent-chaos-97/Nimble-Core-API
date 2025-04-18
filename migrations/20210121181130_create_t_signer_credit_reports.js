exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_credit_reports', (table) => {
