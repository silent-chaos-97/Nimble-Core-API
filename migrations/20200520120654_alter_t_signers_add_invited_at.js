exports.up = function (knex) {
    table.timestamp('invited_at').notNullable().defaultTo(knex.fn.now())
  })
};
exports.down = function (knex) {
