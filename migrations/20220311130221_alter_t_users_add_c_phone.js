  return knex.schema.alterTable('users', table => table.string('phone').nullable())
};
