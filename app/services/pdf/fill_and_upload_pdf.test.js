const axios = require('axios')
const { loadPdf, fillPdf, savePdf } = require('./fill_pdf')
const { docusignHelpers } = require('./upload_document')
const { getPdfFormFields } = require('./pdf_form_fields.test')

	const formFields = getPdfFormFields()
	let pdfDocument1 = await loadPdf('/sample.pdf')
