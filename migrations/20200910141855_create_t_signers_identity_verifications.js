exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('signers_identity_verifications', (table) => {
    table
