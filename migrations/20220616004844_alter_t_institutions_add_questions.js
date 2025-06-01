// Temp comment
exports.up = knex => knex.schema.alterTable('institutions', table => table.jsonb('questions').default('{}'))
