exports.up = (knex) => knex.schema.alterTable('bsa_risk_results', table => table.jsonb('context').default('{}'))
  .then(() => knex.schema.raw(`UPDATE bsa_risk_results as b SET context=(SELECT i.public_metadata #> '{bsa,usCitizen}' FROM institutions as i WHERE i.id=b.institution_id) WHERE b.question_id='usCitizen'`))
  .then(() => knex.schema.raw(`UPDATE bsa_risk_results as b SET context=(SELECT i.public_metadata #> '{bsa,countryOfOrigin}' FROM institutions as i WHERE i.id=b.institution_id) WHERE b.question_id='countryOfOrigin'`))
  .then(() => knex.schema.raw(`UPDATE bsa_risk_results as b SET context=(SELECT i.public_metadata #> '{bsa,milesAway}' FROM institutions as i WHERE i.id=b.institution_id) WHERE b.question_id='milesAway'`))
