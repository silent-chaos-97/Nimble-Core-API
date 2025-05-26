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
// Temp comment
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
      // id proof document fields
      'documentType',
      'documentNumber',
      'documentExpirationDate',
      'documentIssuedDate',
      'documentIssuer',
      // other
      'institutionId',
      'checkSanction',
      'sanctionVerifiedAt',
      'checkPoliticalExposure',
      'politicalExposureVerifiedAt',
      'checkAdverseMedia',
      'adverseMediaVerifiedAt',
      'checkAntiMoneyLaundering',
      'antiMoneyLaunderingVerifiedAt',
      'contractDocumentSignerStatus',
      'contractDocumentSignerStatusUpdatedAt',
      'selfieDocumentId',
      'backIdProofDocumentId',
      'frontIdProofDocumentId',
      'createdAt',
      'invitedAt',
      'verificationStatusFace',
      'verificationStatusFaceUpdatedAt',
      'verificationStatusDocument',
      'verificationStatusDocumentUpdatedAt',
      'verificationStatusAddress',
      'verificationStatusAddressUpdatedAt',
      'verificationStatusSanctions',
      'verificationStatusSanctionsUpdatedAt',
      'verificationStatusMedia',
      'verificationStatusMediaUpdatedAt',
      'verificationStatusPoliticalExposure',
      'verificationStatusPoliticalExposureUpdatedAt',
      'remoteMetadata',
      'checks'
    ]
  }

  static completeStatusProps() {
    return [
      'firstName',
      'middleName',
      'lastName',
      'email',
      'address',
      'city',
      'state',
      'zipCode',
      'ssn',
      'dateOfBirth',
      'phoneNumber',
      'employer',
      'documentType',
      'documentNumber',
      'documentIssuedDate',
      'documentExpirationDate',
      'documentIssuer'
    ]
  }

  static relations() {
    return ['accountRequest', 'institution']
  }

