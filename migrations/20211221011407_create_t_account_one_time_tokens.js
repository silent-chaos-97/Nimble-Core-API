exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {
    table.uuid('account_id').references('accounts.id').notNullable().onDelete('CASCADE')
    table.string('token').notNullable()
    table.timestamp('expires_at').notNullable()
    table.timestamp('consumed_at').defaultTo(null)
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
