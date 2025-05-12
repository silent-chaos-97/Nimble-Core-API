exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('bsa_risk_results', table => {
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
    table.uuid('account_request_id').nullable() // no reference or "ON DELETE CASCADE"
