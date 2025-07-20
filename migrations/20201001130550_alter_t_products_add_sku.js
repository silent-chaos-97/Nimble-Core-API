
  return knex.schema.alterTable('products', function (table) {
    table.string('sku').defaultTo('')
  })
}

