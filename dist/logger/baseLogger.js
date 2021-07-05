"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("winston"));
const crypto_1 = require("../crypto");
const printf_1 = require("./printf");
require("winston-mongodb");
const { format, createLogger } = winston_1.default;
class BaseLogger {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    constructor(options, levels = BaseLogger.Levels) {
        if (!options)
            BaseLogger.throwConfigError();
        if (options.label === undefined)
            options.label = crypto_1.PasswordService.randomBytesAsToken(4);
        if (options.level === undefined)
            options.level = BaseLogger.DefaultLevel();
        if (options.level !== 'info' && options.level !== 'warn' && options.level !== 'error')
            BaseLogger.throwConfigError();
        this.levels = levels;
        this.options = options;
        this.usedTransports = [];
        return this;
    }
    get label() {
        return this.options.label;
    }
    get level() {
        return this.options.level;
    }
    static throwConfigError() {
        throw new Error('invalid configuration');
    }
    combinedFormat() {
        return format.combine(
        // Add the message timestamp with the preferred format
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), 
        // Tell Winston that the logs must be colored
        format.colorize({ all: true }), format.label({ label: this.label }), 
        // Define the format of the message showing the timestamp, the level and the message
        format.printf(printf_1.printf));
    }
    // Create the logger instance that has to be exported
    // and used to log messages.
    initialize() {
        if (this.logger)
            return this.logger;
        return createLogger({
            level: this.level,
            levels: this.levels,
            transports: this.usedTransports,
            exitOnError: false,
            format: this.combinedFormat(),
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message, ...meta) {
        this.logger.warn(message, meta);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message, ...meta) {
        this.logger.info(message, meta);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message, ...meta) {
        this.logger.error(message, meta);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    morganMiddleware() {
        // Override the stream method by telling
        // Morgan to use our custom logger instead of the console.log.
        const stream = {
            // Use the http severity
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            write: (message, ...meta) => this.logger.http(message, meta),
        };
        // Skip all the Morgan http log if the
        // application is not running in development mode.
        // This method is not really needed here since
        // we already told to the logger that it should print
        // only warning and error messages in production.
        const skip = () => {
            const env = process.env.NODE_ENV || 'development';
            return env !== 'development';
        };
        return morgan_1.default(
        // Define message format string (this is the default one).
        // The message format is made from tokens, and each token is
        // defined inside the Morgan library.
        // You can create your custom token to show what do you want from a request.
        ':method :url :status :res[content-length] - :response-time ms', 
        // Options: in this case, I overwrote the stream and the skip logic.
        // See the methods above.
        { stream, skip });
    }
}
exports.BaseLogger = BaseLogger;
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
BaseLogger.Levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
BaseLogger.Colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
BaseLogger.DefaultLevel = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
winston_1.default.addColors(BaseLogger.Colors);
//# sourceMappingURL=baseLogger.js.map