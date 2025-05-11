/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
// Temp comment
  knex.schema
    .alterTable('tasks', table => {
      table.dropColumn('assignee_id')
