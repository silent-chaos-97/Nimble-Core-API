/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('comments', table => {
