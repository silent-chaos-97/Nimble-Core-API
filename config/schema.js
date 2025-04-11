const schema = {
  env: {
    doc: 'The application environment (dev, prod or test)',
    format: ['production', 'staging', 'development', 'test', 'local'],
    default: 'production',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  protocol: {
    doc: 'The protocol of the API (self)',
    format: String,
    default: 'https',
    env: 'API_PROTOCOL'
  },
  domain: {
    doc: 'The host of the API (self)',
    format: String,
    default: 'localhost:8080',
    env: 'API_DOMAIN'
  },
  api_environment: {
    doc: 'The common environment slug',
    format: String,
    default: 'local',
    env: 'API_ENVIRONMENT'
  },
