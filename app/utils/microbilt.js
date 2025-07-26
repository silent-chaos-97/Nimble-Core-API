const _ = require('lodash')
const moment = require('moment/moment')
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

function signerPersonInfo(signer) {
  const PersonName = {
    LastName: signer.lastName,
    FirstName: signer.firstName
  }

  if (signer.middleName) PersonName.MiddleName = signer.middleName

  const ContactInfo = []

  if (signer.address) ContactInfo.push({
    PostAddr: {
      Addr1: signer.address,
      City: signer.city,
      StateProv: signer.state,
      PostalCode: signer.zipCode,
      Country: 'USA'
    }
  })

  if (_.isString(signer.phoneNumber)) {
    const phone = phoneUtil.parse(signer.phoneNumber, 'US')
    if (phoneUtil.isValidNumberForRegion(phone, 'US')) ContactInfo.push({
      PhoneNum: { PhoneType: '11', Phone: `${phone.getNationalNumber()}` }
    })
  }

  if (signer.email) ContactInfo.push({
    EmailAddr: signer.email
  })
  const PersonInfo = {
    PersonName,
    ContactInfo
  }

  if (signer.dateOfBirth) PersonInfo.BirthDt = moment(signer.dateOfBirth).format('YYYY-MM-DD')

  if (signer.ssn) PersonInfo.TINInfo = {
    TINType: '1',
    TaxId: signer.ssn.replace(/[- ]/g, '')
  }

  if (signer.documentType === 'USDL') {
    PersonInfo.DriversLicense = {
      LicenseNum: signer.documentNumber,
      StateProv: signer.documentIssuer,
      Country: 'USA'
    }

    if (signer.documentIssuedDate) PersonInfo.DriversLicense.IssuedDt = moment(signer.documentIssuedDate).format('YYYY-MM-DD')
    if (signer.documentExpirationDate) PersonInfo.DriversLicense.ExpirationDt = moment(signer.documentExpirationDate).format('YYYY-MM-DD')
  }

  if (signer.documentType === 'PASSPORT') {
    PersonInfo.PassportInfo = {
      PassportNum: signer.documentNumber,
      Country: signer.documentIssuer
    }

    if (signer.documentIssuedDate) PersonInfo.PassportInfo.IssuedDt = moment(signer.documentIssuedDate).format('YYYY-MM-DD')
    if (signer.documentExpirationDate) PersonInfo.PassportInfo.ExpirationDt = moment(signer.documentExpirationDate).format('YYYY-MM-DD')
  }

  return { PersonInfo }
