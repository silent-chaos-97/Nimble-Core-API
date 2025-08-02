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

  // partially flatten data from idProofDocument
  static flattenData(data) {
    return {
      ..._.omit(data, 'idProofDocument'),
      ...(_.has(data, 'idProofDocument') ? {
        ...(_.has(data.idProofDocument, 'backDocumentId') ? { backIdProofDocumentId: data.idProofDocument.backDocumentId } : {}),
        ...(_.has(data.idProofDocument, 'frontDocumentId') ? { frontIdProofDocumentId: data.idProofDocument.frontDocumentId } : {}),
        ...(_.has(data.idProofDocument, 'type') ? { documentType: data.idProofDocument.type } : {}),
        ...(_.has(data.idProofDocument, 'number') ? { documentNumber: data.idProofDocument.number } : {}),
        ...(_.has(data.idProofDocument, 'issuedDate') ? { documentIssuedDate: data.idProofDocument.issuedDate } : {}),
        ...(_.has(data.idProofDocument, 'issuer') ? { documentIssuer: data.idProofDocument.issuer } : {}),
        ...(_.has(data.idProofDocument, 'expirationDate') ? { documentExpirationDate: data.idProofDocument.expirationDate } : {}),
      } : {})
    }
  }


  static getSignerStatusBasedOnCompletedProps(signer) {
    const completeProps = _.pick(signer, Signer.completeStatusProps())
    const completeSchema = Signer.schema('complete')

    try {
      app.plugins.validator(completeProps, completeSchema, { abortEarly: false })
      return 'PENDING' // all data OK: status should be PENDING
    } catch (err) {
      // data not OK, we dont need to throw any error, just dont change the status to pending
    }

    return 'INCOMPLETE'
  }

  static schema(operation = 'create') {
    if (!['get', 'create', 'update', 'create.api.public', 'validate.api.public', 'update.api.public', 'webhook', 'complete'].includes(operation)) {
      throw new Error('Invalid schema operation.')
    }

    const baseSchema = Joi.object().keys({
      firstName: Joi.string().max(250).optional(),
      middleName: Joi.string().max(250).allow('').optional(),
      lastName: Joi.string().max(250).optional(),
      address: Joi.string().max(250).optional(),
      city: Joi.string().max(250).optional(),
      state: Joi.string().max(3).optional(),
      zipCode: Joi.string().max(100).optional(),
      phoneNumber: Joi.string().max(20).optional(),
      ssn: Joi.string().max(20).optional(),
      employer: Joi.string().max(250).optional(),
      dateOfBirth: Joi.string().optional(),
      selfieDocumentId: Joi.string().uuid().optional(),
      consent: Joi.boolean().valid(true).error(() => new PreconditionFailedError('Consent Terms not granted')),
      consentAccountOpening: Joi.boolean().valid(true).error(() => new PreconditionFailedError('Consent Account Opening not granted')),
      consentPrivacyPolicy: Joi.boolean().valid(true).error(() => new PreconditionFailedError('Consent Privacy Policy not granted')),
      consentCommunication: Joi.boolean(),
      remoteMetadata: Joi.object().optional(),
    })

    const publicUpdateSchema = baseSchema.keys({
      id: Joi.string().uuid().required(),
      email: Joi.string().email({ tlds: { allow: false } }).optional(),
      idProofDocument: Joi.object().optional().keys({
        type: Joi.string().optional().valid('USDL', 'USID', 'USLR', 'PASSPORT'),
        number: Joi.string().max(100).optional(),
        issuedDate: Joi.string().optional(),
        expirationDate: Joi.string().optional(),
        issuer: Joi.alternatives().conditional('type', {
          is: 'USDL',
          then: Joi.string().optional().valid(...statesUSA),
          otherwise: Joi.string().optional().valid(...countries)
        }),
        frontDocumentId: Joi.string().uuid().optional(),
        backDocumentId: Joi.string().uuid().optional(),
      }).optional(),
    })


    switch (operation) {
      case 'create':
        return baseSchema.keys({
          accountRequestId: Joi.string().uuid().required(),
          email: Joi.string().email({ tlds: { allow: false } }).required(),
          role: Joi.string().required().valid(Signer.PRIMARY_ROLE_NAME, Signer.SECONDARY_ROLE_NAME),
          documentType: Joi.string().optional().valid('USDL', 'USID', 'USLR', 'PASSPORT'),
          documentNumber: Joi.string().max(100).optional(),
          documentIssuedDate: Joi.date().optional(),
          documentExpirationDate: Joi.date().optional(),
          documentIssuer: Joi.alternatives().conditional('documentType', {
            is: 'USDL',
            then: Joi.string().optional().valid(...statesUSA),
            otherwise: Joi.string().optional().valid(...countries)
          }).optional(),
          frontIdProofDocumentId: Joi.string().uuid().optional(),
          backIdProofDocumentId: Joi.string().uuid().optional(),
        })
      case 'update':
        return baseSchema.keys({
          id: Joi.string().uuid().required(),
          email: Joi.string().email({ tlds: { allow: false } }).optional(),
          documentType: Joi.string().optional().valid('USDL', 'USID', 'USLR', 'PASSPORT'),
          documentNumber: Joi.string().max(100).optional(),
          documentIssuedDate: Joi.string().optional(),
          documentExpirationDate: Joi.string().optional(),
          documentIssuer: Joi.alternatives().conditional('documentType', {
            is: 'USDL',
            then: Joi.string().optional().valid(...statesUSA),
            otherwise: Joi.string().optional().valid(...countries)
          }).optional(),
          frontIdProofDocumentId: Joi.string().uuid().optional(),
          backIdProofDocumentId: Joi.string().uuid().optional(),
          status: Joi.string().optional().default('INVITED').valid('INVITED', 'INCOMPLETE', 'PENDING', 'SIGNED'),
          invitedAt: Joi.date().optional(),
          emailVerified: Joi.boolean().optional(),
          emailVerifiedAt: Joi.date().optional().allow(null),
          verificationStatusFace: Joi.string().optional().default('PENDING').valid('VALID', 'INVALID', 'PENDING'),
          verificationStatusFaceUpdatedAt: Joi.date().optional(),
          verificationStatusDocument: Joi.string().optional().default('PENDING').valid('VALID', 'INVALID', 'PENDING'),
          verificationStatusDocumentUpdatedAt: Joi.date().optional(),
          verificationStatusAddress: Joi.string().optional().default('PENDING').valid('VALID', 'INVALID', 'PENDING'),
          verificationStatusAddressUpdatedAt: Joi.date().optional(),
          verificationStatusSanctions: Joi.string().optional().default('PENDING').valid('MATCH', 'NOMATCH', 'PENDING'),
          verificationStatusSanctionsUpdatedAt: Joi.date().optional(),
          verificationStatusMedia: Joi.string().optional().default('PENDING').valid('MATCH', 'NOMATCH', 'PENDING'),
          verificationStatusMediaUpdatedAt: Joi.date().optional(),
          verificationStatusPoliticalExposure: Joi.string().optional().default('PENDING').valid('MATCH', 'NOMATCH', 'PENDING'),
          verificationStatusPoliticalExposureUpdatedAt: Joi.date().optional(),
// Temp comment
        })
      case 'create.api.public':
        return baseSchema.keys({
          accountRequestId: Joi.string().uuid().required(),
          email: Joi.string().email({ tlds: { allow: false } }).required(),
          role: Joi.string().required().valid(Signer.PRIMARY_ROLE_NAME, Signer.SECONDARY_ROLE_NAME),
