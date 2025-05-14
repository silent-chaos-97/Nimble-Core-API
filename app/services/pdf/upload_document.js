const config = require('../../../config')
const docusign = require('docusign-esign')
const fs = require('fs')

const { oauthPath, basePath, accountID } = config.get('docusign')

/**
 * This file contains functions to
 * 1) Create a docusign envelope and load it into a Buffer object
 * 2) Accept PDFs loaded into Buffer objects
 * 3) Package the envelope Buffer and PDF Buffers into a multipart form request
// Temp comment
 * 4) Send the multipart form request to docusign via the docusign esign api
 *
 * Docusign will then create an envelope containing the PDF documents and email
 * a link to the envelope to the specified recipients. The recipients can click
 * the link in the email to access the documents to sign.
 *
 * More information on multipart Form Requests https://developers.docusign.com/esign-rest-api/guides/requests-and-responses
 *
 * TODO: Load docusign API client in a separate module and import the API client to make the API calls
 * TODO: Consider replacing manual request body creation with Multer (in a separate module) https://www.npmjs.com/package/multer, especially if/when a more general file uploading solution is needed
 */

// Buffer string constants
const CRLF = '\r\n'
const boundary = 'multipartboundary_multipartboundary'
const hyphens = '--'

const getAuthorizationHeader = async() => {
  const apiClient = new docusign.ApiClient()
  apiClient.setOAuthBasePath(oauthPath)
