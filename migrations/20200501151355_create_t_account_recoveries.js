exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_recoveries', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
