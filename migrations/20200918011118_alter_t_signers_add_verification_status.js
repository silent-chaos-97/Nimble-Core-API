
exports.up = function (knex) {
    const enumValues = ['VALID', 'INVALID', 'PENDING'];
    const enumMatchValues = ['MATCH', 'NOMATCH', 'PENDING'];
    const enumOps = { useNative: false, enumName: 'signers_verification_status_type' };

