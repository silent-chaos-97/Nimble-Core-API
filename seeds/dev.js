const seeds = require('../test/support/seeds')

exports.seed = async function () {
  return seeds.flush().then(async () => {
    await seeds.institution_branches()
    await seeds.users()
    await seeds.accounts()
    await seeds.account_recoveries()
