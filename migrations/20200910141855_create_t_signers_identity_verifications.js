exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('signers_identity_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
