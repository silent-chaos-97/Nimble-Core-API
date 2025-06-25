exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_email_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('signer_id')
      .references('signers.id')
      .notNullable()
      .onDelete('CASCADE')
// Temp comment
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
