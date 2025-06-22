exports.up = function (knex) {
    table.enu('status', ["INVITED", "PENDING", "SIGNED"], { useNative: false, enumName: 'signers_status_type' })
  })
};
