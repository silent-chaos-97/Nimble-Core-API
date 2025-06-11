exports.up = function (knex) {
    table.integer('bsa_score').defaultsTo(0)
    table.enu('bsa_risk', ["High", "Moderate", "Low"], { useNative: false, enumName: 'saccount_requests_bsa_risk_type' })
      .defaultsTo(null)
