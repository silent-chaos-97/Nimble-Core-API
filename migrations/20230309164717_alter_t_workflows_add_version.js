const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = function(knex) {
  return db.alterTableIfColumnNotExists(knex, 'workflows', 'version', table => table.string('version').notNullable().default('1'))
