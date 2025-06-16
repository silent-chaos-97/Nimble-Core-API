const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('file_entries', function (t) {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    t.string('name')
    t.boolean('is_dir').defaultTo(false)
    t.integer('size').nullable()
