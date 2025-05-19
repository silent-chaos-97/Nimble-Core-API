
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
