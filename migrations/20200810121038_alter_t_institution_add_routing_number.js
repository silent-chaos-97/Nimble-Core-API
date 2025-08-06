
exports.up = function (knex) {
    table.string('routing_number').notNullable().default("")
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
