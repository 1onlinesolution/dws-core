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
exports.DefaultMongoOptions = void 0;
const winston = __importStar(require("winston"));
const { format } = winston;
const DefaultMongoOptions = {
    // Label stored with entry object if defined.
    label: 'mongo',
    // Level of messages that this transport should log, defaults to 'info'.
    level: 'error',
    // MongoDB connection uri, pre-connected MongoClient object or promise which resolves to a pre-connected MongoClient object.
    db: '',
    // MongoDB connection parameters (optional, defaults to {poolSize: 2, autoReconnect: true, useNewUrlParser: true}).
    options: {
        poolSize: 2,
        // autoReconnect: true, // Deprecated...
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    // The name of the collection you want to store log messages in, defaults to 'log'.
    collection: '',
    // Boolean indicating if you want to store machine hostname in logs entry,
    // if set to true it populates MongoDB entry with 'hostname' field,
    // which stores os.hostname() value.
    storeHost: true,
    // In case this property is true, winston-mongodb will try to create new log collection as capped, defaults to false.
    capped: true,
    // Size of logs capped collection in bytes, defaults to 10000000.
    cappedMax: 1024 * 1024 * 10,
    // Boolean flag indicating whether to suppress output, defaults to false.
    silent: false,
    // Will remove color attributes from the log entry message, defaults to false.
    decolorize: true,
    // Whether the returned logs should include the _id attribute settled by mongodb, defaults to false.
    includeIds: false,
    // Transport instance identifier. Useful if you need to create multiple MongoDB transports.
    name: undefined,
    // Configure which key is used to store metadata in the logged info object.
    // Defaults to 'metadata' to remain compatible with the metadata format
    metaKey: 'metadata',
    // https://stackoverflow.com/questions/62191253/meta-is-null-in-winston-mongodb
    format: format.combine(format.errors({ stack: true }), // log the full stack
    format.timestamp(), // get the time stamp part of the full log message
    format.metadata()),
};
exports.DefaultMongoOptions = DefaultMongoOptions;
//# sourceMappingURL=defaultMongoOptions.js.map