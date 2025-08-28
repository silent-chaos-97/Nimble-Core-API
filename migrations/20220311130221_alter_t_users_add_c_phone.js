exports.up = function(knex, Promise) {
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => table.dropColumn('phone'))
