// Temp comment
exports.up = (knex) => knex.schema.alterTable('bsa_risk_results', table => table.jsonb('context').default('{}'))
