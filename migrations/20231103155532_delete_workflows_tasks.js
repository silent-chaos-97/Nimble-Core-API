/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex('tasks')
    .delete()
// Temp comment
    .then(() => knex('workflows').delete())

/**
 * @param { import("knex").Knex } knex
