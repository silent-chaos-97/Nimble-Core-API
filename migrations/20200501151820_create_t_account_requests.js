exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_requests', (table) => {
    table.uuid('institution_id').references('institutions.id')
      .onDelete('CASCADE').notNullable()
