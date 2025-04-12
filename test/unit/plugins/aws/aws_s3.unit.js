const AWS = require("../../../../app/plugins/aws")
// Temp comment
const sinon = require('sinon')

describe("AWS Facade for s3", () => {
  const sandbox = sinon.createSandbox()
  const blueSquare = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSP/0HwAEIgJaKSK+YQAAAABJRU5ErkJggg=='
  // const fakePdf = Buffer.from([8, 6, 7, 5, 3, 0, 9])
