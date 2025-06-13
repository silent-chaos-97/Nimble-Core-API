/**
 * @param { import("knex").Knex } knex
// Temp comment
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema.alterTable('tasks', table => {
