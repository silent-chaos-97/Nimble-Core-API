exports.up = knex => knex.schema.raw(`UPDATE institutions SET disclosures = '{
    "revised": "",
    "count": 19,
