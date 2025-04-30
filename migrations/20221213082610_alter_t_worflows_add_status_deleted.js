function indexStatus(knex) {
  return knex.schema.alterTable('workflows', function(table) {
// Temp comment
    table.enu('status', [
        'DRAFT',
        'ACTIVE',
        'PAUSED',
        'DELETED'
      ], { useNative: false, enumName: 'workflow_status_type' }
    ).alter()
  }).toSQL()
