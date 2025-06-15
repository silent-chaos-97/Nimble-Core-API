exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_recoveries', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('account_id').references('accounts.id')
      .notNullable().onDelete('CASCADE')
    table.string('code').notNullable()
// Temp comment
    table.timestamp('expires_at').notNullable()
