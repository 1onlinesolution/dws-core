import DateTimeUtils from '../tools/dateTimeUtils';

interface HttpResponse {
  status: number,
  success: boolean,
  timestamp: Date,
  ip: string | undefined,
  value: string | object | undefined, // eslint-disable-line @typescript-eslint/ban-types
  error: string | object | undefined, // eslint-disable-line @typescript-eslint/ban-types
}

// eslint-disable-next-line @typescript-eslint/ban-types
function response(status: number, value: string | object | undefined, error = undefined, ipAddress: string | undefined = undefined): HttpResponse {
  return {
    status: status,
    value: value,
    success: status < 400,
    timestamp: DateTimeUtils.currentUtcDate(),
    ip: ipAddress,
    error: error
  };
}

export default class HttpStatus {
  // === Codes

  static readonly statusOk = 200;

  static readonly statusCreated = 201;

  static readonly statusNoContent = 204;

  static readonly statusFound = 302;

  static readonly statusBadRequest = 400;

  static readonly statusUnauthorized = 401;

  static readonly statusForbidden = 403;

  static readonly statusNotFound = 404;

  static readonly statusConflict = 409;

  static readonly statusUnprocessableEntity = 422;

  static readonly statusServerError = 500;

  static readonly statusNotImplemented = 501;

  static readonly statusBadGateway = 502;

  static readonly statusServiceUnavailable = 503;

  // === Names

  static readonly statusNameOk = 'Ok';

  static readonly statusNameCreated = 'Created';

  static readonly statusNameNoContent = 'No Content';

  static readonly statusNameFound = 'Found';

  static readonly statusNameBadRequest = 'BadRequest';

  static readonly statusNameUnauthorized = 'Unauthorized';

  static readonly statusNameForbidden = 'Forbidden';

  static readonly statusNameNotFound = 'Not Found';

  static readonly statusNameConflict = 'Conflict';

  static readonly statusNameUnprocessableEntity = 'Unprocessable Entity';

  static readonly statusNameServerError = 'Internal Server Error';

  static readonly statusNameNotImplemented = 'Not Implemented';

  static readonly statusNameBadGateway = 'Bad Gateway';

  static readonly statusNameServiceUnavailable = 'Service Unavailable';

  // === Responses

  /**
   * 200: Success:
   * This code indicates a full success. Nothing went wrong even remotely.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static ok(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusOk, value || HttpStatus.statusNameOk, error, ip);
  }

  /**
   * 201: Created:
   * This code is used mainly for REST APIs when the client
   * requests to create a new entity in the server.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static created(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusCreated, value || HttpStatus.statusNameCreated, error, ip);
  }

  /**
   * 204: No LandingPageContent:
   * This is a successful code, but there is no content coming
   * back from the server. Sometimes, APIs returns 200, even if there is no content.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static noContent(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusNoContent, value || HttpStatus.statusNameNoContent, error, ip);
  }

  /**
   * 302: Found:
   * This code indicates that the user is required to perform a temporary redirect for some reason,
   * but the browsers started implementing this code as 303 See Other.
   * This lead to the introduction of the 303 and 307 Temporary redirect codes to disambiguate the overlap of behavior.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static found(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusFound, value || HttpStatus.statusNameFound, error, ip);
  }

  /**
   * 400: Bad Request:
   * This code indicates that the request from the user is syntactically incorrect.
   * There could be parameters missing or some of the values didn't pass validation.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static badRequest(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusBadRequest, value || HttpStatus.statusNameBadRequest, error, ip);
  }

  /**
   * 401: Unauthorized:
   * This code represents a lack of authentication of the client.
   * Usually, a valid login will fix this problem.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static unauthorized(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusUnauthorized, value || HttpStatus.statusNameUnauthorized, error, ip);
  }

  /**
   * 403: Forbidden:
   * This is similar to 401, but in this case,
   * it is indicating that the user does not have enough privileges.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forbidden(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusForbidden, value || HttpStatus.statusNameForbidden, error, ip);
  }

  /**
   * 404: Not Found:
   * This means that the resource is not found in the server.
   * This is the error that you get when you navigate to a page that does not exist.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static notFound(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusNotFound, value || HttpStatus.statusNameNotFound, error, ip);
  }

  /**
   * 409: Conflict:
   * This means a request conflict with current state of the server.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static conflict(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusConflict, value || HttpStatus.statusNameConflict, error, ip);
  }

  /**
   * 422: Unprocessable Entity:
   * This means hat the server understands the content type of the request entity,
   * and the syntax of the request entity is correct,
   * but it was unable to process the contained instructions.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static unprocessableEntity(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusUnprocessableEntity, value || HttpStatus.statusNameUnprocessableEntity, error, ip);
  }

  /**
   * 500: Internal Server Error:
   * This means that an error has occurred in the software in the server.
   * There is no more information disclosed.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static serverError(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusServerError, value || HttpStatus.statusNameServerError, error, ip);
  }

  /**
   * 501: Not Implemented:
   * This error occurs when a client hits an endpoint that has not been implemented yet.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static notImplemented(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusNotImplemented, value || HttpStatus.statusNameNotImplemented, error, ip);
  }

  /**
   * 502: Bad Gateway:
   * A server (not necessarily a Web server) is acting as a gateway or proxy
   * to fulfil the request by the client (e.g. your Web browser or our CheckUpDown robot) to access the requested URL.
   * This server received an invalid response from an upstream server it accessed to fulfil the request.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static badGateway(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusBadGateway, value || HttpStatus.statusNameBadGateway, error, ip);
  }

  /**
   * 503: Service unavailable:
   * This code is issued when the server is not available for some reason,
   * either an excess of the load or the server is down.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static serviceUnavailable(value: string | object | undefined, error = undefined, ip = undefined): HttpResponse {
    return response(HttpStatus.statusServiceUnavailable, value || HttpStatus.statusNameServiceUnavailable, error, ip);
  }
}
