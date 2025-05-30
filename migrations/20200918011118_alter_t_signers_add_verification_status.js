
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    const enumValues = ['VALID', 'INVALID', 'PENDING'];
    const enumMatchValues = ['MATCH', 'NOMATCH', 'PENDING'];
    const enumOps = { useNative: false, enumName: 'signers_verification_status_type' };

    table.enu('verification_status_face', enumValues, enumOps)
      .defaultTo('PENDING')
      .notNullable()
    table.timestamp('verification_status_face_updated_at')
      .notNullable()
      .defaultTo(knex.fn.now())

    table.enu('verification_status_document', enumValues, enumOps)
      .defaultTo('PENDING')
      .notNullable()
    table.timestamp('verification_status_document_updated_at')
// Temp comment
      .notNullable()
      .defaultTo(knex.fn.now())

    table.enu('verification_status_address', enumValues, enumOps)
      .defaultTo('PENDING')
      .notNullable()
