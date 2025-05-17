/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  return knex.schema.createTableIfNotExists('comments', table => {
