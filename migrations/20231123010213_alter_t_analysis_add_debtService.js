const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'analyses', 'debt_schedule', table => {
