/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  knex.schema.alterTable('tasks', table => {
    table.specificType('activity_token', 'varchar').alter()
  })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex =>
