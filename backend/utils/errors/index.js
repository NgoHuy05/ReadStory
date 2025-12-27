export class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.status = 401;
  }
}

export class PaymentRequiredError extends Error {
  constructor(message = "Payment Required") {
    super(message);
    this.status = 402;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.status = 403;
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
  }
}

export class MethodNotAllowedError extends Error {
  constructor(message = "Method Not Allowed") {
    super(message);
    this.status = 405;
  }
}

export class NotAcceptableError extends Error {
  constructor(message = "Not Acceptable") {
    super(message);
    this.status = 406;
  }
}

export class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.status = 409;
  }
}

export class GoneError extends Error {
  constructor(message = "Gone") {
    super(message);
    this.status = 410;
  }
}

export class UnsupportedMediaTypeError extends Error {
  constructor(message = "Unsupported Media Type") {
    super(message);
    this.status = 415;
  }
}

export class UnprocessableEntityError extends Error {
  constructor(message = "Unprocessable Entity") {
    super(message);
    this.status = 422;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message = "Too Many Requests") {
    super(message);
    this.status = 429;
  }
}


export class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    this.status = 500;
  }
}

export class NotImplementedError extends Error {
  constructor(message = "Not Implemented") {
    super(message);
    this.status = 501;
  }
}

export class BadGatewayError extends Error {
  constructor(message = "Bad Gateway") {
    super(message);
    this.status = 502;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message = "Service Unavailable") {
    super(message);
    this.status = 503;
  }
}

export class GatewayTimeoutError extends Error {
  constructor(message = "Gateway Timeout") {
    super(message);
    this.status = 504;
  }
}
