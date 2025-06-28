exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_recoveries', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('account_id').references('accounts.id')
    table.string('code').notNullable()
    table.timestamp('expires_at').notNullable()
    table.timestamp('consumed_at').defaultTo(null)
