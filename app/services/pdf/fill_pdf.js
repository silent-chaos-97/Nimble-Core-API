const { PDFDocument } = require('pdf-lib')
const fs = require('fs').promises

// TODO: Separate fs related methods into their own module
const read = async (filePath) => fs.readFile(__dirname + filePath)

const load = async (filePath) => {
	const data = await read(filePath)
	return pdfDocument
}

const fill = (pdfDocument, formValues) => {
	const form = pdfDocument.getForm()
	for (const formValue of formValues) {
		const { key, value, readOnly } = formValue
		const field = form.getTextField(key)
		field.setText(value)
		if (readOnly) field.enableReadOnly()
	}
	return pdfDocument
