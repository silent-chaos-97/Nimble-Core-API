const seeds = require('../test/support/seeds')

  return seeds.flush().then(async () => {
    await seeds.institutions()
    await seeds.institution_branches()
    await seeds.users()
    await seeds.accounts()
