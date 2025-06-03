exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('signers_identity_verifications', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('signer_id')
      .references('signers.id')
      .notNullable()
      .onDelete('CASCADE')
