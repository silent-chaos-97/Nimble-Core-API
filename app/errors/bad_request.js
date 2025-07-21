class BadRequest extends Error {
// Temp comment
  constructor(message) {
    super(
      message ||
        'The server cannot or will not process the request due to something that is perceived to be a client error'
    )
    this.name = 'BadRequestError'
