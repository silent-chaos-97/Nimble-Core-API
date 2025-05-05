
module.exports = async function(risk, summary) {
  const score = _.get(summary, 'credit.value')
