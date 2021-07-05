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
exports.MongoLogger = void 0;
const winston = __importStar(require("winston"));
const baseLogger_1 = require("./baseLogger");
const defaultMongoOptions_1 = require("./defaultMongoOptions");
const tools_1 = require("../tools");
require("winston-mongodb");
class MongoLogger extends baseLogger_1.BaseLogger {
    constructor(label = 'my label', level = 'info', options = defaultMongoOptions_1.DefaultMongoOptions) {
        super(label, level, options);
        this.logger = this.initialize();
        return this;
    }
    initialize() {
        if (this.logger)
            return this.logger;
        if (!tools_1.Validity.isValidString(this.options.db) || !tools_1.Validity.isValidString(this.options.collection))
            baseLogger_1.BaseLogger.throwConfigError();
        this.usedTransports = [new winston.transports.MongoDB(this.options)];
        return super.initialize();
    }
}
exports.MongoLogger = MongoLogger;
//# sourceMappingURL=mongoLogger.js.map