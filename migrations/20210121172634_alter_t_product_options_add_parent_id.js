
  return knex.schema.alterTable('product_options', function (table) {
    table.string('lead').defaultsTo(null)
    table.string('annotation').defaultsTo(null)
    table.uuid('parent_id')
