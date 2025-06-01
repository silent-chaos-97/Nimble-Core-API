exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
    table.uuid('created_by_id').nullable()

    // update existing rows
              (SELECT id 
                FROM signers 
                WHERE account_request_id = a.id 
            ORDER BY created_at ASC 
