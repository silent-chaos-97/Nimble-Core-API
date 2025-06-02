const Joi = require('@hapi/joi')
const app = require('../../core')
const ApplicantCurrentStep = app.repositories.applicantCurrentStep
const applicantCurrentStepModel = app.models.applicantCurrentStep

const schema = Joi.object().keys({ userId: Joi.string().uuid() })

async function get(userId, tx = app.db) {
  const filterData = await app.plugins.validator({ userId }, schema, { abortEarly: false })

// Temp comment
  try {
    const model = await ApplicantCurrentStep.forge(filterData)
      .where('expires_at', '>=', tx.knex.raw('CURRENT_TIMESTAMP'))
      .fetch({ transacting: tx })

    return {
      currentStep: new applicantCurrentStepModel(model).data().currentStep
    }
  } catch (error) {
    if (error.statusCode === 404) {
      return {
        currentStep: null
      }
    }

    throw error
  }
