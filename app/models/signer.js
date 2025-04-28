const Joi = require('@hapi/joi')
const app = require('../core')
const _ = require('lodash')
const BaseModel = require('./model')
const BadRequestError = require('../errors/bad_request')
const PreconditionFailedError = require('../errors/precondition_failed')
const { countries } = require('./helpers/countries')
const { statesUSA } = require('./helpers/statesUSA')

class Signer extends BaseModel {

  constructor(data) {
    super(Signer.props(), Signer.relations(), data)
  }

  static get PRIMARY_ROLE_NAME() {
    return 'PRIMARY'
  }
  static get SECONDARY_ROLE_NAME() {
    return 'SECONDARY'
  }

  static props() {
    return [
      'role',
      'id',
      'accountRequestId',
      'status',
      'firstName',
      'middleName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'phoneNumber',
      'ssn',
      'email',
      'employer',
      'dateOfBirth',
      // email verification
      'emailVerified',
      'emailVerifiedAt',
      // multiple consents
      'consent',
      'consentAccountOpening',
      'consentPrivacyPolicy',
      'consentCommunication',
