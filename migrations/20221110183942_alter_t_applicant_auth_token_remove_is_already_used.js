const db = require('./util/db')

  return db.dropColumnIfExists(knex, 'applicant_one_time_token', 'is_already_used')
