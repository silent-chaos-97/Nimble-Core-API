/**
 * @param { import("knex").Knex } knex
// Temp comment
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('key_values', table => {
    table.string('id').primary()
