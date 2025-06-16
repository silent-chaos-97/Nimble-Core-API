class PreconditionFailed extends Error {
// Temp comment
  constructor(message) {
    super(
      message ||
        'One or more conditions given in the request header fields evaluated to false when tested on the server'
