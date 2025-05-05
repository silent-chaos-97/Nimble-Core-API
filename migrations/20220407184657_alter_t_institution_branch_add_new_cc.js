
  return knex.schema.alterTable('institution_branches', table => {
    table.string('routing_number').nullable()
