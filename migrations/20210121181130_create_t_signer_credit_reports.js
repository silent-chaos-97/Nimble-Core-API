exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_credit_reports', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

    table.string('error_code').nullable()
    table.string('reference').notNullable()
    table.timestamp('report_date').nullable()
