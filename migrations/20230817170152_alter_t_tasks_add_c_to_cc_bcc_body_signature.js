const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'to_id', table => {
