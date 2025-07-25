
exports.up = function(knex) {
  return db.dropColumnIfExists(knex, 'applicant_one_time_token', 'salt')
}

