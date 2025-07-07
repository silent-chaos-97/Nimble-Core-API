/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex('tasks')
    .then(() => knex('workflows').delete())
