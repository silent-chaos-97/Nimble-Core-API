exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
  })
}

exports.down = function(knex, Promise) {
