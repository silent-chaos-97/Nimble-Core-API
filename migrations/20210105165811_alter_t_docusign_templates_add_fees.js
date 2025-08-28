const config = require('../config')

function getServiceFeeTemplateId (api_environment) {
  // as of right now, demo and dev are the same
  if (api_environment === 'prod' || api_environment === 'demo') {
  } else {
    return 'c2b862c6-7827-46a1-bdcd-fea345785daa'
  }
