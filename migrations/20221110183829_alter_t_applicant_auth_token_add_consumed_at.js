const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'applicant_one_time_token', 'consumed_at', table => {
