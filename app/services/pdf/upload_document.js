const config = require('../../../config')
const docusign = require('docusign-esign')
const fs = require('fs')

const { oauthPath, basePath, accountID } = config.get('docusign')

/**
 * This file contains functions to
 * 1) Create a docusign envelope and load it into a Buffer object
 * 2) Accept PDFs loaded into Buffer objects
 * 3) Package the envelope Buffer and PDF Buffers into a multipart form request
 * 4) Send the multipart form request to docusign via the docusign esign api
 *
 * Docusign will then create an envelope containing the PDF documents and email
 * a link to the envelope to the specified recipients. The recipients can click
 * the link in the email to access the documents to sign.
