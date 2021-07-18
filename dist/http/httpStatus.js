"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = exports.HttpStatusName = exports.HttpStatusCode = void 0;
const tools_1 = require("../tools");
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
    HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
    HttpStatusCode[HttpStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatusCode[HttpStatusCode["ServerError"] = 500] = "ServerError";
    HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
    HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var HttpStatusName;
(function (HttpStatusName) {
    HttpStatusName["Ok"] = "Ok";
    HttpStatusName["Created"] = "Created";
    HttpStatusName["NoContent"] = "No Content";
    HttpStatusName["Found"] = "Found";
    HttpStatusName["BadRequest"] = "BadRequest";
    HttpStatusName["Unauthorized"] = "Unauthorized";
    HttpStatusName["Forbidden"] = "Forbidden";
    HttpStatusName["NotFound"] = "Not Found";
    HttpStatusName["Conflict"] = "Conflict";
    HttpStatusName["UnprocessableEntity"] = "Unprocessable Entity";
    HttpStatusName["ServerError"] = "Internal Server Error";
    HttpStatusName["NotImplemented"] = "Not Implemented";
    HttpStatusName["BadGateway"] = "Bad Gateway";
    HttpStatusName["ServiceUnavailable"] = "Service Unavailable";
})(HttpStatusName = exports.HttpStatusName || (exports.HttpStatusName = {}));
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
function response(status, value, error, ipAddress) {
    return {
        status: status,
        value: value,
        success: status < 400,
        timestamp: tools_1.DateTimeUtils.currentUtcDate(),
        ip: ipAddress,
        error: error,
    };
}
class HttpStatus {
    // === Responses
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static error(error, value, ip) {
        return response(error.statusCode, value, error.message, ip);
    }
    /**
     * 200: Success:
     * This code indicates a full success. Nothing went wrong even remotely.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static ok(value, error, ip) {
        return response(HttpStatusCode.Ok, value || HttpStatusName.Ok, error, ip);
    }
    /**
     * 201: Created:
     * This code is used mainly for REST APIs when the client
     * requests to create a new entity in the server.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static created(value, error, ip) {
        return response(HttpStatusCode.Created, value || HttpStatusName.Created, error, ip);
    }
    /**
     * 204: No LandingPageContent:
     * This is a successful code, but there is no content coming
     * back from the server. Sometimes, APIs returns 200, even if there is no content.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static noContent(value, error, ip) {
        return response(HttpStatusCode.NoContent, value || HttpStatusName.NoContent, error, ip);
    }
    /**
     * 302: Found:
     * This code indicates that the user is required to perform a temporary redirect for some reason,
     * but the browsers started implementing this code as 303 See Other.
     * This lead to the introduction of the 303 and 307 Temporary redirect codes to disambiguate the overlap of behavior.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static found(value, error, ip) {
        return response(HttpStatusCode.Found, value || HttpStatusName.Found, error, ip);
    }
    /**
     * 400: Bad Request:
     * This code indicates that the request from the user is syntactically incorrect.
     * There could be parameters missing or some of the values didn't pass validation.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static badRequest(value, error, ip) {
        return response(HttpStatusCode.BadRequest, value || HttpStatusName.BadRequest, error, ip);
    }
    /**
     * 401: Unauthorized:
     * This code represents a lack of authentication of the client.
     * Usually, a valid login will fix this problem.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static unauthorized(value, error, ip) {
        return response(HttpStatusCode.Unauthorized, value || HttpStatusName.Unauthorized, error, ip);
    }
    /**
     * 403: Forbidden:
     * This is similar to 401, but in this case,
     * it is indicating that the user does not have enough privileges.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static forbidden(value, error, ip) {
        return response(HttpStatusCode.Forbidden, value || HttpStatusName.Forbidden, error, ip);
    }
    /**
     * 404: Not Found:
     * This means that the resource is not found in the server.
     * This is the error that you get when you navigate to a page that does not exist.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static notFound(value, error, ip) {
        return response(HttpStatusCode.NotFound, value || HttpStatusName.NotFound, error, ip);
    }
    /**
     * 409: Conflict:
     * This means a request conflict with current state of the server.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static conflict(value, error, ip) {
        return response(HttpStatusCode.Conflict, value || HttpStatusName.Conflict, error, ip);
    }
    /**
     * 422: Unprocessable Entity:
     * This means hat the server understands the content type of the request entity,
     * and the syntax of the request entity is correct,
     * but it was unable to process the contained instructions.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static unprocessableEntity(value, error, ip) {
        return response(HttpStatusCode.UnprocessableEntity, value || HttpStatusName.UnprocessableEntity, error, ip);
    }
    /**
     * 500: Internal Server Error:
     * This means that an error has occurred in the software in the server.
     * There is no more information disclosed.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static serverError(value, error, ip) {
        return response(HttpStatusCode.ServerError, value || HttpStatusName.ServerError, error, ip);
    }
    /**
     * 501: Not Implemented:
     * This error occurs when a client hits an endpoint that has not been implemented yet.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static notImplemented(value, error, ip) {
        return response(HttpStatusCode.NotImplemented, value || HttpStatusName.NotImplemented, error, ip);
    }
    /**
     * 502: Bad Gateway:
     * A server (not necessarily a Web server) is acting as a gateway or proxy
     * to fulfil the request by the client (e.g. your Web browser or our CheckUpDown robot) to access the requested URL.
     * This server received an invalid response from an upstream server it accessed to fulfil the request.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static badGateway(value, error, ip) {
        return response(HttpStatusCode.BadGateway, value || HttpStatusName.BadGateway, error, ip);
    }
    /**
     * 503: Service unavailable:
     * This code is issued when the server is not available for some reason,
     * either an excess of the load or the server is down.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static serviceUnavailable(value, error, ip) {
        return response(HttpStatusCode.ServiceUnavailable, value || HttpStatusName.ServiceUnavailable, error, ip);
    }
}
exports.HttpStatus = HttpStatus;
//# sourceMappingURL=httpStatus.js.map