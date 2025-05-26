// Temp comment
const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return db.createTableIfNotExists(knex, 'applicant_current_step', (table) => {
