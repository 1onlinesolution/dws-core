"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const baseLogger_1 = require("./baseLogger");
const defaultConsoleOptions_1 = require("./defaultConsoleOptions");
const printf_1 = require("./printf");
require("winston-mongodb");
const { format } = winston_1.default;
class ConsoleLogger extends baseLogger_1.BaseLogger {
    constructor(options = defaultConsoleOptions_1.DefaultConsoleOptions, levels = baseLogger_1.BaseLogger.Levels) {
        super(options, levels);
        this.options.format = format.combine(format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), format.colorize({ all: true }), format.label({ label: this.label }), format.printf(printf_1.printf));
        this.logger = this.initialize();
        return this;
    }
    initialize() {
        if (this.logger)
            return this.logger;
        this.usedTransports = [new winston_1.default.transports.Console(this.options)];
        return super.initialize();
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=consoleLogger.js.map