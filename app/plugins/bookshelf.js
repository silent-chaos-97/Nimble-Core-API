const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile)

Bookshelf.plugin('bookshelf-camelcase')
