exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verifications', (table) => {
