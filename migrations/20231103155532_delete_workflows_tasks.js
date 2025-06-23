/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  knex('tasks')
    .delete()
