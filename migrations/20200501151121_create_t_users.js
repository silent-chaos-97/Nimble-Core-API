module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
      .notNullable().onDelete('CASCADE')
    table.string('email').notNullable()
    table.string('first_name')
    table.string('last_name')

