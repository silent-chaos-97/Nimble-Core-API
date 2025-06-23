/**
 * @param { import("knex").Knex } knex
 */
exports.up = knex =>
  knex.schema.alterTable('tasks', table => {
    table.specificType('activity_token', 'varchar').alter()
  })
