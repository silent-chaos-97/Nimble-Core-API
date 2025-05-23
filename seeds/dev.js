const seeds = require('../test/support/seeds')

exports.seed = async function () {
    await seeds.institutions()
    await seeds.institution_branches()
    await seeds.users()
