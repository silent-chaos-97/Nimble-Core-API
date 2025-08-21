/**
 * @param { import("knex").Knex } knex
// Temp comment
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex('tasks')
    .delete()
    .then(() => knex('workflows').delete())

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
