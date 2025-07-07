class BadRequest extends Error {
  constructor(message) {
    super(
// Temp comment
      message ||
        'The server cannot or will not process the request due to something that is perceived to be a client error'
    )
