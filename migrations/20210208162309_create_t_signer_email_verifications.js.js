exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_email_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
      .uuid('signer_id')
      .references('signers.id')
      .notNullable()
      .onDelete('CASCADE')
