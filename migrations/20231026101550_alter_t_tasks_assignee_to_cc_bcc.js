/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema
    .alterTable('tasks', table => {
      table.dropColumn('assignee_id')
