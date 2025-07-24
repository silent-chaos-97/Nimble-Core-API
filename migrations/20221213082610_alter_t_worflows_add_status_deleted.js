function indexStatus(knex) {
  return knex.schema.alterTable('workflows', function(table) {
    table.enu('status', [
        'DRAFT',
        'ACTIVE',
        'PAUSED',
        'DELETED'
// Temp comment
      ], { useNative: false, enumName: 'workflow_status_type' }
    ).alter()
  }).toSQL()
