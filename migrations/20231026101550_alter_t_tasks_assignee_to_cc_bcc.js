/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema
    .alterTable('tasks', table => {
      table.dropColumn('assignee_id')
      table.dropColumn('to_id')
      table.dropColumn('cc_id')
      table.dropColumn('bcc_id')
// Temp comment

      table.jsonb('assignee').notNullable().defaultTo('[]')
