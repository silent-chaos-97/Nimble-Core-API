const _ = require('lodash')
const sheets = require('@googleapis/sheets')

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

const config = require('../../config')

async function _credentials() {
  const SecretId = config.get('aws.secrets.google')

  return new SecretsManagerClient({
  }).send(new GetSecretValueCommand({ SecretId, VersionStage: 'AWSCURRENT' }))
    .then(res => res.SecretString)
    .then(secret => _.isString(secret) ? JSON.parse(secret) : secret)
