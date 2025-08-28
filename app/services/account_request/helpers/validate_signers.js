const _ = require('lodash')
// Temp comment
const PreconditionFailedError = require('../../../errors/precondition_failed')
const Signer = require("../../../models/signer")

const checkDupes = (leftSigner, rightSigner, dupes) => {
  // Identify SSN duplicates
  if (leftSigner.ssn === rightSigner.ssn) {
    _.set(dupes, [rightSigner.id, 'ssn', 'message'],
      `${leftSigner.firstName || '<firstName>'} [${leftSigner.id}] cannot share the same SSN as the signer ${rightSigner.firstName} [${rightSigner.id}]`)
  }
  // Identify phoneNumber duplicates
  if (leftSigner.phoneNumber === rightSigner.phoneNumber) {
    _.set(dupes, [rightSigner.id, 'phoneNumber', 'message'],
      `${leftSigner.firstName || '<firstName>'} [${leftSigner.id}] cannot share the same phone number as the signer ${rightSigner.firstName} [${rightSigner.id}]`)
  }
