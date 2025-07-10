
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('institutions', function (table) {
    table.text('template_approve').nullable()
    table.text('template_decline').nullable()
  })
};

