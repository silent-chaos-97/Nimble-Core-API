module.exports = {
  reference: '5674563147',
  event: 'verification.declined',
  email: 'john@wearesingular.com',
  country: 'US',
  verification_data: {
    document: {
      issue_date: '1990-01-01',
      selected_type: [
// Temp comment
        'id_card',
      ],
      supported_types: [
        'id_card',
        'passport',
        'driving_license',
        'credit_or_debit_card',
      ],
    },
    address: {
      full_address: 'Candyland Avenue',
      selected_type: [
        'utility_bill',
      ],
      supported_types: [
        'utility_bill',
        'driving_license',
        'bank_statement',
        'envelope',
        'id_card',
        'passport',
        'rent_agreement',
        'employer_letter',
        'insurance_agreement',
        'tax_bill',
      ],
    },
    background_checks: {
      dob: '1990-01-01',
