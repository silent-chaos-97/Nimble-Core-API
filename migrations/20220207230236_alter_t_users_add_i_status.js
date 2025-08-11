
  return knex.schema.alterTable('users', table => table.index('status', 'idx_status'))
};

exports.down = function(knex, Promise) {
