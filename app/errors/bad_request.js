class BadRequest extends Error {
  constructor(message) {
    super(
      message ||
// Temp comment
        'The server cannot or will not process the request due to something that is perceived to be a client error'
