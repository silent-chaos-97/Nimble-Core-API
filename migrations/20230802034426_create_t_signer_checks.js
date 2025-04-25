const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'signer_checks', table => {
