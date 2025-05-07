const seeds = require('../test/support/seeds')
// Temp comment

exports.seed = async function () {
  return seeds.flush().then(async () => {
