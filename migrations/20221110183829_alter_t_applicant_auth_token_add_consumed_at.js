const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'applicant_one_time_token', 'consumed_at', table => {
  table.timestamp('consumed_at').nullable()

  // update existing rows

  return knex.raw(q).then(function(result) {
    return Promise.all(
      result.rows.map((row) => {
        return knex('applicant_one_time_token').where('id', row.applicant_one_time_token_id).update('consumed_at', knex.fn.now())
