  return knex.schema.alterTable('account_requests', function (table) {
    table.uuid('created_by_id').nullable()

    // update existing rows
