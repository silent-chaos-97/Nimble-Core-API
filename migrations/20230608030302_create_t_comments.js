/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('comments', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('text')

    table.uuid('created_by_id').references('users.id').notNullable()
