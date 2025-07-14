const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../../core')
const User = app.repositories.user
const UserModel = app.models.user
const logger = app.logger.getLogger('app.services.user.get')
const { v4: uuid } = require('uuid')

const schema = Joi.object().keys({ id: Joi.string().uuid() })

async function get({ id, institutionId = null, include = {} } = {}, tx = app.db) {
  app.plugins.validator({ id }, schema, { abortEarly: false })

  const filter = institutionId ? { id, institutionId } : { id }

  const model = await User.forge(filter)
    .fetch({
      withRelated: _.get(include, 'withRelated', ['accounts', 'institution', 'branch']),
      transacting: tx
    })
    .then(async m => !m ? null : m)

  const user = new UserModel(model).data()

  if (include.kyc) {
    const profileQueryParams = {}
    if (user.phone) {
      profileQueryParams.phone = user.phone
    }
    if (user.email && !user.email.includes('placeholder-email-id-for')) {
      profileQueryParams.email = user.email
    }
    if (user.first_name) {
      profileQueryParams.first_name = user.first_name
    }
    if (user.last_name) {
      profileQueryParams.last_name = user.last_name
    }

    if (profileQueryParams.phone || profileQueryParams.email) {
      try {
        const profileData = await app.services.data.profile(profileQueryParams)

        user._kyc = {
          firstName: _.get(profileData, 'person.first_name'),
          lastName: _.get(profileData, 'person.last_name'),
          emails: _.get(profileData, 'person.emails', []),
          phoneNumbers: _.get(profileData, 'person.phone_numbers', []).map(phoneNumber => ({
            phoneNumber,
            current: phoneNumber === _.get(profileData, 'person.mobile_phone')
          })),
          address: _.get(profileData, 'person.location_street_address') ? {
            state: _.get(profileData, 'person.location_region'),
            city: _.get(profileData, 'person.location_locality'),
            streetAddress: _.get(profileData, 'person.location_street_address'),
            streetAddressAdditional: _.get(profileData, 'person.location_address_line_2'),
            postalCode: _.get(profileData, 'person.location_postal_code')
          } : {}
        }
      } catch(err) {
        const logId = uuid()
        logger.error(err, { logId, profileQueryParams, userId: user.id })

        user._kyc = {
          error: { code: 'KycProfileRetrievalFailed', logId, message: `Error while attempting to retrieve User[${user.id}]'s KYC profile.` },
          firstName: undefined,
          lastName: undefined,
          emails: [],
          phoneNumbers: [],
          address: {
            streetAddress: undefined,
            streetAddressAdditional: undefined,
            city: undefined,
            postalCode: undefined
          }
        }
      }
    }
  }

  return user
