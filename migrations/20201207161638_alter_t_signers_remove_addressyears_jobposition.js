  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('address_years')
    table.dropColumn('job_position')
  })
