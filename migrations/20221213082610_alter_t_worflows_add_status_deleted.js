function indexStatus(knex) {
  return knex.schema.alterTable('workflows', function(table) {
    table.enu('status', [
        'DRAFT',
        'ACTIVE',
        'PAUSED',
        'DELETED'
      ], { useNative: false, enumName: 'workflow_status_type' }
    ).alter()
  }).toSQL()
}

exports.up = knex => knex.schema.raw('ALTER TABLE workflows DROP CONSTRAINT IF EXISTS workflows_status_check;')
  .then(() => indexStatus(knex))
  .catch(err => indexStatus(knex))

exports.down = knex => knex