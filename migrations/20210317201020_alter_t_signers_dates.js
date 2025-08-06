exports.up = function(knex) {
    table.date('document_issued_date').alter()
    table.date('document_expiration_date').alter()
  })
}

