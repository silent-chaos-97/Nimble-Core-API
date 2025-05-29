exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('account_id').references('accounts.id').notNullable().onDelete('CASCADE')
    table.string('token').notNullable()
