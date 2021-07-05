"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMongoOptions = exports.DefaultFileOptions = exports.DefaultConsoleOptions = exports.MongoLogger = exports.ConsoleLogger = exports.FileLogger = void 0;
const fileLogger_1 = require("./fileLogger");
Object.defineProperty(exports, "FileLogger", { enumerable: true, get: function () { return fileLogger_1.FileLogger; } });
const consoleLogger_1 = require("./consoleLogger");
Object.defineProperty(exports, "ConsoleLogger", { enumerable: true, get: function () { return consoleLogger_1.ConsoleLogger; } });
const mongoLogger_1 = require("./mongoLogger");
Object.defineProperty(exports, "MongoLogger", { enumerable: true, get: function () { return mongoLogger_1.MongoLogger; } });
const defaultConsoleOptions_1 = require("./defaultConsoleOptions");
Object.defineProperty(exports, "DefaultConsoleOptions", { enumerable: true, get: function () { return defaultConsoleOptions_1.DefaultConsoleOptions; } });
const defaultFileOptions_1 = require("./defaultFileOptions");
Object.defineProperty(exports, "DefaultFileOptions", { enumerable: true, get: function () { return defaultFileOptions_1.DefaultFileOptions; } });
const defaultMongoOptions_1 = require("./defaultMongoOptions");
Object.defineProperty(exports, "DefaultMongoOptions", { enumerable: true, get: function () { return defaultMongoOptions_1.DefaultMongoOptions; } });
//# sourceMappingURL=index.js.map