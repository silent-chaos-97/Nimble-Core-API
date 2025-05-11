exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
