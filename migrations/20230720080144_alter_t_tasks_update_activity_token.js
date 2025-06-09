/**
 * @param { import("knex").Knex } knex
 */
exports.up = knex =>
  knex.schema.alterTable('tasks', table => {
