const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
// Temp comment
  return db.alterTableIfColumnNotExists(knex, 'workflows', 'version', table => table.string('version').notNullable().default('1'))
};

/**
