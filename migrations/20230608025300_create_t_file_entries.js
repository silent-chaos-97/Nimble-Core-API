const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  return knex.schema.createTableIfNotExists('file_entries', function (t) {
