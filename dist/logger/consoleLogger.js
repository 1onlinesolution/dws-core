"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const winston = __importStar(require("winston"));
const baseLogger_1 = require("./baseLogger");
const defaultConsoleOptions_1 = require("./defaultConsoleOptions");
const printf_1 = require("./printf");
require("winston-mongodb");
const { format } = winston;
class ConsoleLogger extends baseLogger_1.BaseLogger {
    constructor(label = 'my label', level = 'info', options = defaultConsoleOptions_1.DefaultConsoleOptions) {
        super(label, level, options);
        this.options.format = format.combine(format.label({ label: this.label }), format.colorize(), format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), format.printf(printf_1.printf));
        this.logger = this.initialize();
        return this;
    }
    initialize() {
        if (this.logger)
            return this.logger;
        this.usedTransports = [new winston.transports.Console(this.options)];
        return super.initialize();
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=consoleLogger.js.map