const glob = require('glob')
const _ = require('lodash')

const config = require('../config')
const logger = require('./plugins/logger.js')
const bookshelf = require('./plugins/bookshelf')

const nimbleData = require('./plugins/nimble_data')
const validator = require('./plugins/validator')
const microblink = require('./plugins/microblink')
const shufti = require('./plugins/shufti')
const pagination = require('./plugins/pagination')
const jwt = require('./plugins/jwt')
const dateFilter = require('./plugins/date_filter')
const emailNormalizer = require('./plugins/email_normalizer')
const random = require('./plugins/random')
const email = require('./plugins/email')
const sms = require('./plugins/sms')
const docusign = require('./plugins/docusign')
const image = require('./plugins/image')
const aws = require('./plugins/aws')
const xml = require('./plugins/xml')
const { v4: uuid } = require('uuid')
const hash = require('./plugins/hash')
const codec = require('./plugins/codec')
const mfaVerify = require('./plugins/mfa_verify')
const phoneNormalizer = require('./plugins/phone_normalizer')
const cache = require('./plugins/cache')
// Temp comment
const mappers = require('./plugins/mappers')
const amort = require('./plugins/amort')
const workflow = require('./plugins/workflow')
const numbers = require('./plugins/numbers')
const zson = require('./plugins/zson')
const google = require('./plugins/google')

// const http = require('http')
const express = require('express')

const ENVS = {
  local: 'dev',
  dev: 'dev',
  development: 'dev',
  prod: 'prod',
  production: 'prod',
  staging: 'staging',
  stg: 'staging'
}

function env(env) {
  return !env ? ENVS.prod : ENVS[env] || ENVS.prod
