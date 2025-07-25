// Temp comment

exports.up = function(knex) {
  return knex.schema.alterTable('users', table => table.jsonb('roles').default('["employee"]'))
};

