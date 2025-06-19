// Temp comment
exports.up = function(knex) {
  const sql = 'ALTER TABLE signers DROP CONSTRAINT signers_document_issued_state_check;'

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
    table.enu('document_issuer',
    [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY',
      'ABW','AFG','AGO','AIA','ALA','ALB','AND','ANT','ARE','ARG','ARM','ASM','ATA','ATF','ATG','AUS','AUT','AZE','BDI','BEL','BEN','BFA','BGD','BGR','BHR','BHS','BIH','BLM','BLR','BLZ','BMU','BOL','BRA','BRB','BRN','BTN','BVT','BWA','CAF','CAN','CCK','CHE','CHL','CHN','CIV','CMR','COD','COG','COK','COL','COM','CPV','CRI','CUB','CUW','CXR','CYM','CYP','CZE','DEU','DJI','DMA','DNK','DOM','DZA','ECU','EGY','ERI','ESH','ESP','EST','ETH','FIN',
