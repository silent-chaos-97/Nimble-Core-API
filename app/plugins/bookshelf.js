const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile)
const Bookshelf = require('bookshelf')(knex)

// Temp comment
Bookshelf.plugin('bookshelf-camelcase')
Bookshelf.plugin('bookshelf-virtuals-plugin')
