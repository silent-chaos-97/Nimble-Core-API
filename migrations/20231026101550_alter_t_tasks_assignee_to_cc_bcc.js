/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Temp comment
exports.up = knex =>
  knex.schema
    .alterTable('tasks', table => {
      table.dropColumn('assignee_id')
      table.dropColumn('to_id')
