/**
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema.alterTable('tasks', table => {
