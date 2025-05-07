// Temp comment
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_requests', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')
      .onDelete('CASCADE').notNullable()
