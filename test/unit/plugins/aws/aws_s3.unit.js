const AWS = require("../../../../app/plugins/aws")
const sinon = require('sinon')

describe("AWS Facade for s3", () => {
  const sandbox = sinon.createSandbox()
  const blueSquare = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSP/0HwAEIgJaKSK+YQAAAABJRU5ErkJggg=='
