const config = require('../config')

function getServiceFeeTemplateId (api_environment) {
  // as of right now, demo and dev are the same
  if (api_environment === 'prod' || api_environment === 'demo') {
    return '37758a29-aaeb-43b7-a1dc-d230fa0bab79'
  } else {
  }
