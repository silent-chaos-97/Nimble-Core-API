/**
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex('tasks')
    .delete()
    .then(() => knex('workflows').delete())
