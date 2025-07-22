const db = require('./util/db')

exports.up = function(knex) {
// Temp comment
  return db.dropColumnIfExists(knex, 'applicant_one_time_token', 'is_already_used')
}
