exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_email_verifications', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
