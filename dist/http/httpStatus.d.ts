import { CustomError } from '../models';
export declare enum HttpStatusCode {
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
    ServiceUnavailable = 503
}
export declare enum HttpStatusName {
    Ok = "Ok",
    Created = "Created",
    NoContent = "No Content",
    Found = "Found",
    BadRequest = "BadRequest",
    Unauthorized = "Unauthorized",
    Forbidden = "Forbidden",
    NotFound = "Not Found",
    Conflict = "Conflict",
    UnprocessableEntity = "Unprocessable Entity",
    ServerError = "Internal Server Error",
    NotImplemented = "Not Implemented",
    BadGateway = "Bad Gateway",
    ServiceUnavailable = "Service Unavailable"
}
export interface HttpResponse {
    status: HttpStatusCode;
    success: boolean;
    timestamp: Date;
    ip?: string;
    value?: any;
    error?: CustomError | Error | string;
}
export declare class HttpStatus {
    static error(error: CustomError, value?: any, ip?: string): HttpResponse;
    /**
     * 200: Success:
     * This code indicates a full success. Nothing went wrong even remotely.
     */
    static ok(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 201: Created:
     * This code is used mainly for REST APIs when the client
     * requests to create a new entity in the server.
     */
    static created(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 204: No LandingPageContent:
     * This is a successful code, but there is no content coming
     * back from the server. Sometimes, APIs returns 200, even if there is no content.
     */
    static noContent(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 302: Found:
     * This code indicates that the user is required to perform a temporary redirect for some reason,
     * but the browsers started implementing this code as 303 See Other.
     * This lead to the introduction of the 303 and 307 Temporary redirect codes to disambiguate the overlap of behavior.
     */
    static found(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 400: Bad Request:
     * This code indicates that the request from the user is syntactically incorrect.
     * There could be parameters missing or some of the values didn't pass validation.
     */
    static badRequest(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 401: Unauthorized:
     * This code represents a lack of authentication of the client.
     * Usually, a valid login will fix this problem.
     */
    static unauthorized(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 403: Forbidden:
     * This is similar to 401, but in this case,
     * it is indicating that the user does not have enough privileges.
     */
    static forbidden(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 404: Not Found:
     * This means that the resource is not found in the server.
     * This is the error that you get when you navigate to a page that does not exist.
     */
    static notFound(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 409: Conflict:
     * This means a request conflict with current state of the server.
     */
    static conflict(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 422: Unprocessable Entity:
     * This means hat the server understands the content type of the request entity,
     * and the syntax of the request entity is correct,
     * but it was unable to process the contained instructions.
     */
    static unprocessableEntity(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 500: Internal Server Error:
     * This means that an error has occurred in the software in the server.
     * There is no more information disclosed.
     */
    static serverError(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 501: Not Implemented:
     * This error occurs when a client hits an endpoint that has not been implemented yet.
     */
    static notImplemented(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 502: Bad Gateway:
     * A server (not necessarily a Web server) is acting as a gateway or proxy
     * to fulfil the request by the client (e.g. your Web browser or our CheckUpDown robot) to access the requested URL.
     * This server received an invalid response from an upstream server it accessed to fulfil the request.
     */
    static badGateway(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
    /**
     * 503: Service unavailable:
     * This code is issued when the server is not available for some reason,
     * either an excess of the load or the server is down.
     */
    static serviceUnavailable(value?: any, error?: CustomError | Error | string, ip?: string): HttpResponse;
}
