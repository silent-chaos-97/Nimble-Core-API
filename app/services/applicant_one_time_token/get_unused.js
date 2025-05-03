const app = require('../../core')
const ApplicantOneTimeToken = app.repositories.applicantOneTimeToken

async function getUnused(phone, tx = app.db) {
  const query = ApplicantOneTimeToken.query(sql => {
    sql.where('applicant_one_time_token.phone', phone)
    sql.andWhere('applicant_one_time_token.consumed_at', null)
  })

  return await query.fetchAll({
    transacting: tx
  })
