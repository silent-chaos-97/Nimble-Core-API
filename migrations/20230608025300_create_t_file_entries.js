const db = require('./util/db')

/**
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('file_entries', function (t) {
