class PreconditionFailed extends Error {
    super(
      message ||
        'One or more conditions given in the request header fields evaluated to false when tested on the server'
    )
