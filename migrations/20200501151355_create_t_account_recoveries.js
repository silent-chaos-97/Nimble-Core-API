exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_recoveries', (table) => {
    table.uuid('account_id').references('accounts.id')
      .notNullable().onDelete('CASCADE')
    table.string('code').notNullable()
    table.timestamp('expires_at').notNullable()
    table.timestamp('consumed_at').defaultTo(null)

