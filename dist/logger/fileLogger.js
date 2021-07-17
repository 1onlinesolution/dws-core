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
exports.FileLogger = void 0;
const winston = __importStar(require("winston"));
const baseLogger_1 = require("./baseLogger");
const defaultFileOptions_1 = require("./defaultFileOptions");
const tools_1 = require("../tools");
require("winston-mongodb");
class FileLogger extends baseLogger_1.BaseLogger {
    constructor(options = defaultFileOptions_1.DefaultFileOptions, levels = baseLogger_1.BaseLogger.Levels) {
        super(options, levels);
        this.kind = 'file';
        this.logger = this.initialize();
        Object.freeze(this.logger);
        return this;
    }
    initialize() {
        if (this.logger)
            return this.logger;
        if (!tools_1.Validity.isValidString(this.options.filename))
            baseLogger_1.BaseLogger.throwConfigError();
        this.usedTransports = [new winston.transports.File(this.options)];
        return super.initialize();
    }
}
exports.FileLogger = FileLogger;
//# sourceMappingURL=fileLogger.js.map