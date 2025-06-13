const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
