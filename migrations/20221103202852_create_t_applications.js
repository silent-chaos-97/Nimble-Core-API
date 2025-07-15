const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
  table.uuid('applicant_id').references('users.id')
    .onDelete('CASCADE').notNullable()
  table.enu('status', ['PENDING', 'DECLINED', 'APPROVED'], { useNative: false, enumName: 'account_request_status_type' })
    .defaultTo('PENDING').notNullable()
  table.string('session').notNullable()

