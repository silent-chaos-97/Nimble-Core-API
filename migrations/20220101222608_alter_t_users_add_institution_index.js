exports.up = function(knex, Promise) {
    table.index('institution_id', 'idx_institution_id')
  })
}

exports.down = function(knex, Promise) {
