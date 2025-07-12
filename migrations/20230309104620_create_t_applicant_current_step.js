const db = require('./util/db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  return db.createTableIfNotExists(knex, 'applicant_current_step', (table) => {
    table.uuid('user_id').primary().references('users.id')
    table.string('current_step', 255).notNullable()
    table.timestamp('expires_at').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
