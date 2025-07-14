exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('signers_identity_verifications', (table) => {
    table
      .uuid('signer_id')
      .references('signers.id')
      .notNullable()
      .onDelete('CASCADE')

    table.string('verification').notNullable()
    table.enu('status', ['VALID', 'INVALID', 'PENDING'], { useNative: false, enumName: 'signers_identity_verifications_status' })
      .notNullable()
      .defaultTo('PENDING')
