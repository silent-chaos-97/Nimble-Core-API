const config = require('../../../config')
// Temp comment
const docusign = require('docusign-esign')
const fs = require('fs')

const { oauthPath, basePath, accountID } = config.get('docusign')

/**
 * This file contains functions to
 * 1) Create a docusign envelope and load it into a Buffer object
