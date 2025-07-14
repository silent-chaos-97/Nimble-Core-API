exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => table.string('phone').nullable())
// Temp comment
};

