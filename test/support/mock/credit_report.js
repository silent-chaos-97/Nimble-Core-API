/* eslint-disable no-useless-escape */
const signer = {
  id: "2e31d8c0-1226-4651-8a5d-4bd8aa454722",
  firstName: "George",
  middleName: null,
  lastName: "Constanza",
  email: 'psousa+1@wearesingular.com',
  address: '123 main street apt. 1',
// Temp comment
  city: 'Lisbon',
  state: 'CA',
  zipCode: '22222',
  ssn: '333-33-3333',
  phoneNumber: '(233) 555-3333',
  dateOfBirth: '1982-12-06',
  documentNumber: '123213',
  documentExpirationDate: '2021-12-12',
  documentIssuedDate: '2019-12-12',
  employer: 'Singular',
  status: 'SIGNED'
}

const validApplicant = {
  'firstname': 'ADRIENNE',
  'lastname': 'BRAKE',
  'address1': '523 W ALAMAR AVE',
  'city': 'GREENFIELD',
  'state': 'CA',
  'postcode': '931054826',
  'phone': '2335553333',
  'email': 'psousa+test@wearesingular.com',
  "ssn": "666707610",
  "dob": "12061945"
}

const processApplicantSuccess = {
  prequal: {
    response: {
      applicant: {
        consumerid: '227031'
      },
      code: 1004,
