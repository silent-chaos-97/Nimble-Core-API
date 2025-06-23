/**
 * @param { import("knex").Knex } knex
 */
exports.up = knex =>
  knex('tasks')
