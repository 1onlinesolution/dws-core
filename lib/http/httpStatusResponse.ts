import { CustomError } from '../models';
import { DateTimeUtils } from '../tools';

export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  ServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export enum HttpStatusName {
  Ok = 'Ok',
  Created = 'Created',
  NoContent = 'No Content',
  Found = 'Found',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'Not Found',
  Conflict = 'Conflict',
  UnprocessableEntity = 'Unprocessable Entity',
  ServerError = 'Internal Server Error',
  NotImplemented = 'Not Implemented',
  BadGateway = 'Bad Gateway',
  ServiceUnavailable = 'Service Unavailable',
}

export interface HttpResponse {
  status: HttpStatusCode;
  success: boolean;
  timestamp: Date;
  ip?: string;
  value?: any; // eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  error?: CustomError | Error | string;
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
function response(status: HttpStatusCode, value?: any, error?: CustomError | Error | string, ipAddress?: string): HttpResponse {
  return {
    status: status,
    value: value,
    success: status < 400,
    timestamp: DateTimeUtils.currentUtcDate(),
    ip: ipAddress,
    error: error,
  };
}

export class HttpStatusResponse {
  // === Responses

  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static error(error: CustomError, value?: any, ip?: string): HttpResponse {
    return response(error.statusCode, value, error.message, ip);
  }

  /**
   * 200: Success:
   * This code indicates a full success. Nothing went wrong even remotely.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static ok(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Ok, value || HttpStatusName.Ok, error, ip);
  }

  /**
   * 201: Created:
   * This code is used mainly for REST APIs when the client
   * requests to create a new entity in the server.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static created(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Created, value || HttpStatusName.Created, error, ip);
  }

  /**
   * 204: No LandingPageContent:
   * This is a successful code, but there is no content coming
   * back from the server. Sometimes, APIs returns 200, even if there is no content.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static noContent(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.NoContent, value || HttpStatusName.NoContent, error, ip);
  }

  /**
   * 302: Found:
   * This code indicates that the user is required to perform a temporary redirect for some reason,
   * but the browsers started implementing this code as 303 See Other.
   * This lead to the introduction of the 303 and 307 Temporary redirect codes to disambiguate the overlap of behavior.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static found(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Found, value || HttpStatusName.Found, error, ip);
  }

  /**
   * 400: Bad Request:
   * This code indicates that the request from the user is syntactically incorrect.
   * There could be parameters missing or some of the values didn't pass validation.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static badRequest(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.BadRequest, value || HttpStatusName.BadRequest, error, ip);
  }

  /**
   * 401: Unauthorized:
   * This code represents a lack of authentication of the client.
   * Usually, a valid login will fix this problem.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static unauthorized(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Unauthorized, value || HttpStatusName.Unauthorized, error, ip);
  }

  /**
   * 403: Forbidden:
   * This is similar to 401, but in this case,
   * it is indicating that the user does not have enough privileges.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static forbidden(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Forbidden, value || HttpStatusName.Forbidden, error, ip);
  }

  /**
   * 404: Not Found:
   * This means that the resource is not found in the server.
   * This is the error that you get when you navigate to a page that does not exist.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static notFound(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.NotFound, value || HttpStatusName.NotFound, error, ip);
  }

  /**
   * 409: Conflict:
   * This means a request conflict with current state of the server.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static conflict(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.Conflict, value || HttpStatusName.Conflict, error, ip);
  }

  /**
   * 422: Unprocessable Entity:
   * This means hat the server understands the content type of the request entity,
   * and the syntax of the request entity is correct,
   * but it was unable to process the contained instructions.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static unprocessableEntity(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.UnprocessableEntity, value || HttpStatusName.UnprocessableEntity, error, ip);
  }

  /**
   * 500: Internal Server Error:
   * This means that an error has occurred in the software in the server.
   * There is no more information disclosed.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static serverError(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.ServerError, value || HttpStatusName.ServerError, error, ip);
  }

  /**
   * 501: Not Implemented:
   * This error occurs when a client hits an endpoint that has not been implemented yet.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static notImplemented(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.NotImplemented, value || HttpStatusName.NotImplemented, error, ip);
  }

  /**
   * 502: Bad Gateway:
   * A server (not necessarily a Web server) is acting as a gateway or proxy
   * to fulfil the request by the client (e.g. your Web browser or our CheckUpDown robot) to access the requested URL.
   * This server received an invalid response from an upstream server it accessed to fulfil the request.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static badGateway(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.BadGateway, value || HttpStatusName.BadGateway, error, ip);
  }

  /**
   * 503: Service unavailable:
   * This code is issued when the server is not available for some reason,
   * either an excess of the load or the server is down.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  static serviceUnavailable(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse {
    return response(HttpStatusCode.ServiceUnavailable, value || HttpStatusName.ServiceUnavailable, error, ip);
  }
}
