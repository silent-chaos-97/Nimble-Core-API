exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {
    table.uuid('account_id').references('accounts.id').notNullable().onDelete('CASCADE')
    table.string('token').notNullable()
