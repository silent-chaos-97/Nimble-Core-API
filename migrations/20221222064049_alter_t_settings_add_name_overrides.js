
exports.up = knex => Promise.all([
  db.dropColumnIfExists(knex, 'settings', 'title'),
