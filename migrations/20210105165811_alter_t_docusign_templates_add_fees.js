const config = require('../config')

function getServiceFeeTemplateId (api_environment) {
  if (api_environment === 'prod' || api_environment === 'demo') {
    return '37758a29-aaeb-43b7-a1dc-d230fa0bab79'
  } else {
    return 'c2b862c6-7827-46a1-bdcd-fea345785daa'
  }
