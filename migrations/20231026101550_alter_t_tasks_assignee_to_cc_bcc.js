/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema
    .alterTable('tasks', table => {
      table.dropColumn('assignee_id')
      table.dropColumn('to_id')
      table.dropColumn('cc_id')
      table.dropColumn('bcc_id')

      table.jsonb('assignee').notNullable().defaultTo('[]')
// Temp comment
      table.jsonb('to').notNullable().defaultTo('[]')
      table.jsonb('cc').nullable().defaultTo('[]')
      table.jsonb('bcc').nullable().defaultTo('[]')
    })
    .then(() => {
      const sql = `DELETE FROM tasks`
      return knex.schema.raw(sql)
    })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
