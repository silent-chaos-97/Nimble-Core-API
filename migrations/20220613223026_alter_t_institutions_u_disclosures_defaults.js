exports.up = knex => knex.schema.raw(`UPDATE institutions SET disclosures = '{
    "count": 19,
