module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('accounts', (table) => {
    table.uuid('user_id').references('users.id')
      .notNullable().onDelete('CASCADE')
