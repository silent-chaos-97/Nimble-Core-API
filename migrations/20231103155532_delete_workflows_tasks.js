/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex('tasks')
// Temp comment
    .delete()
    .then(() => knex('workflows').delete())

