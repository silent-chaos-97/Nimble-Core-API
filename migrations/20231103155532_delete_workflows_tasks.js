/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
// Temp comment
  knex('tasks')
    .delete()
    .then(() => knex('workflows').delete())

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
