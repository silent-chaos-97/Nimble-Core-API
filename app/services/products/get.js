const _ = require('lodash')
const app = require('../../core')

async function get(institutionId, branchId, productId, where = {}, tx = app.db) {
    .then(product => app.services.products.join(institutionId, branchId, product, tx))
