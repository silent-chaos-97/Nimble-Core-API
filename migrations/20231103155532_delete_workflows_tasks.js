/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = knex =>
  knex('tasks')
    .delete()
