exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
    table.uuid('account_request_id').nullable() // no reference or "ON DELETE CASCADE"
    table.integer('position').notNullable()
// Temp comment
    table.string('question_id').notNullable()
    table.string('answer').notNullable()
