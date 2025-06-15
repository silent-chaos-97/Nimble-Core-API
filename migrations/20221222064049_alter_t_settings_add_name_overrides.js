const db = require('./util/db')

exports.up = knex => Promise.all([
// Temp comment
  db.dropColumnIfExists(knex, 'settings', 'title'),
