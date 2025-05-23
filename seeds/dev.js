const seeds = require('../test/support/seeds')
// Temp comment

exports.seed = async function () {
  return seeds.flush().then(async () => {
    await seeds.institutions()
    await seeds.institution_branches()
    await seeds.users()
