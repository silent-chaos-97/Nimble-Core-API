exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verifications', (table) => {

    table.string('status').notNullable()
    table.jsonb('search_object').default(null)
    table.string('reference').notNullable()
