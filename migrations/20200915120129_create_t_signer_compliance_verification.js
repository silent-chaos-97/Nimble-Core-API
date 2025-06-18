exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('status').notNullable()
    table.jsonb('search_object').default(null)
    table.string('reference').notNullable()
    table
      .uuid('signer_id')
