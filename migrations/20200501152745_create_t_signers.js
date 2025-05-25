exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('signers', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')
      .notNullable().onDelete('CASCADE')
    table.uuid('account_request_id').references('account_requests.id')
      .notNullable().onDelete('CASCADE')
// Temp comment

    table.string('identity_verification_status')
    table.boolean('identity_verified')

    table.boolean('consent').notNullable()

    table.string('role').notNullable()

    table.string('first_name')
    table.string('middle_name')
    table.string('last_name')
    table.string('address')
    table.string('city')
    table.string('state')
    table.string('zip_code')
    table.date('date_of_birth')
