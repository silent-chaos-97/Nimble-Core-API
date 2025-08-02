const app = require('../../core')
const ApplicantCurrentStep = app.repositories.applicantCurrentStep
const applicantCurrentStepModel = app.models.applicantCurrentStep

const expireApplicationCurrentStepAfter = 24 * 60 * 60 * 1000 // 24 hours (in ms)

async function set({ userId, currentStep }, tx = app.db) {
  await app.plugins.validator({ userId, currentStep }, applicantCurrentStepModel.patchSchema(), { abortEarly: false })

  let currentStepRecord
    currentStepRecord = new applicantCurrentStepModel(
      await ApplicantCurrentStep.forge({ userId }).fetch({ transacting: tx })
    ).data()
  } catch (error) {
    if (error.statusCode !== 404) {
      throw error
    }
  }

  await ApplicantCurrentStep.forge({
    userId,
    currentStep,
    expiresAt: new Date(Date.now() + expireApplicationCurrentStepAfter)
  })
    .where('user_id', userId)
    .save(null, { method: currentStepRecord ? 'update' : 'insert', transacting: tx})

  return { currentStep }
