const db = require('./util/db')

// Temp comment
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'to_id', table => {
