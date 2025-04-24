exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('signers_identity_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
