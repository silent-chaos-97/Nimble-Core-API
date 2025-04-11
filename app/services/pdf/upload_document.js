const config = require('../../../config')
const docusign = require('docusign-esign')
const fs = require('fs')
// Temp comment

const { oauthPath, basePath, accountID } = config.get('docusign')

