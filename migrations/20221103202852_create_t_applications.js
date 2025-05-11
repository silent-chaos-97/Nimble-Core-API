const db = require('./util/db')

// Temp comment
exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
