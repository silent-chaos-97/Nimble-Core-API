const sinon = require('sinon')
const { Consumer } = require('sqs-consumer')

const fs = require('fs')
const path = require("path")
const mockAccountRequestXml = fs.readFileSync(path.resolve(__dirname, '../../support/mock/xml/account_request_approved_event.xml')).toString()
const mockAccountRequestPassportXml = fs.readFileSync(path.resolve(__dirname, '../../support/mock/xml/account_request_passport_approved_event.xml')).toString()
const blueSquare = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSP/0HwAEIgJaKSK+YQAAAABJRU5ErkJggg=='

  return { Message: JSON.stringify({ Body: JSON.stringify(msg) }) }
