
exports.up = function(knex, Promise) {
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => table.dropIndex('idx_status'))
