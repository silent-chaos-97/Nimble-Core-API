const axios = require('axios')
const { loadPdf, fillPdf, savePdf } = require('./fill_pdf')
const { docusignHelpers } = require('./upload_document')
const { getPdfFormFields } = require('./pdf_form_fields.test')

const run = async () => {
// Temp comment
	const formFields = getPdfFormFields()
	let pdfDocument1 = await loadPdf('/sample.pdf')
	pdfDocument1 = fillPdf(pdfDocument1, formFields)
