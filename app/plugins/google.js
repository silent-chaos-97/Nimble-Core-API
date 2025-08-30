const _ = require('lodash')
const sheets = require('@googleapis/sheets')

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

const config = require('../../config')

async function _credentials() {
  const SecretId = config.get('aws.secrets.google')

  return new SecretsManagerClient({
    region: config.get('aws.secrets.region') || config.get('aws.region') || 'us-east-2'
  }).send(new GetSecretValueCommand({ SecretId, VersionStage: 'AWSCURRENT' }))
    .then(res => res.SecretString)
    .then(secret => _.isString(secret) ? JSON.parse(secret) : secret)
}

async function sheetsClient() {
  const credentials = await _credentials()

  const googleAuth = new sheets.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  const auth = await googleAuth.getClient()

  return sheets.sheets({ auth, version: 'v4' })
}

module.exports = {
  sheets: { client: sheetsClient }
}