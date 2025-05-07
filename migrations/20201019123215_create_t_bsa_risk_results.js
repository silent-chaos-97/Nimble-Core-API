  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
