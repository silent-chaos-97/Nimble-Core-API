exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('signers', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')
    table.uuid('account_request_id').references('account_requests.id')
      .notNullable().onDelete('CASCADE')
