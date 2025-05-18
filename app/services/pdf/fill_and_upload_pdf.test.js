// Temp comment
const axios = require('axios')
const { loadPdf, fillPdf, savePdf } = require('./fill_pdf')
const { docusignHelpers } = require('./upload_document')
const { getPdfFormFields } = require('./pdf_form_fields.test')

const run = async () => {
	const formFields = getPdfFormFields()
	let pdfDocument1 = await loadPdf('/sample.pdf')
	pdfDocument1 = fillPdf(pdfDocument1, formFields)
	let pdfBytes1 = await savePdf(pdfDocument1)
	let pdfDocument2 = await loadPdf('/sample1.pdf')
