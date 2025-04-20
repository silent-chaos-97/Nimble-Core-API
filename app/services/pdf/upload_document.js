const config = require('../../../config')
const docusign = require('docusign-esign')

const { oauthPath, basePath, accountID } = config.get('docusign')

/**
 * This file contains functions to
 * 1) Create a docusign envelope and load it into a Buffer object
 * 2) Accept PDFs loaded into Buffer objects
 * 3) Package the envelope Buffer and PDF Buffers into a multipart form request
