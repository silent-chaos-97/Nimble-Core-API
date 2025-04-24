exports.up = function (knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('signer_compliance_verification_items', (table) => {
