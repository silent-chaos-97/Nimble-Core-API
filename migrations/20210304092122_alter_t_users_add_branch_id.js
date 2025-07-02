
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.uuid('branch_id')
      .onDelete('CASCADE')
      .defaultsTo(null)
  })
