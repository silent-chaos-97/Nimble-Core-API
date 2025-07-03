exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
    table.uuid('account_request_id').nullable() // no reference or "ON DELETE CASCADE"
    table.integer('position').notNullable()
    table.string('question_id').notNullable()
    table.string('answer').notNullable()
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.index('institution_id')
    table.index('account_request_id')
