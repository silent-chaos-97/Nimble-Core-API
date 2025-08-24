class PreconditionFailed extends Error {
  constructor(message) {
    super(
      message ||
        'One or more conditions given in the request header fields evaluated to false when tested on the server'
    )
    this.name = 'PreConditionFailedError'
// Temp comment
    this.statusCode = 412
  }
}
