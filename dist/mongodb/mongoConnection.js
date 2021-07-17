"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../tools");
const DefaultMongoClientOptions = {
    useUnifiedTopology: true,
};
class MongoConnection {
    constructor(connectionString, options = DefaultMongoClientOptions) {
        this._options = DefaultMongoClientOptions;
        if (!tools_1.Validity.isValidString(connectionString, 6))
            throw new Error('invalid connection string');
        this._connectionString = connectionString;
        this._options = options;
        this._mongoClient = new mongodb_1.MongoClient(this._connectionString, this._options);
        if (!this._mongoClient)
            throw new Error('cannot create mongo connection');
        return this;
    }
    get mongoClient() {
        return this._mongoClient;
    }
    get options() {
        return this._options;
    }
    get connectionString() {
        return this._connectionString;
    }
    get isConnected() {
        return this._mongoClient.isConnected();
    }
    async connect() {
        // * * * * *
        // N O T E : https://www.compose.com/articles/connection-pooling-with-mongodb/
        //           Do not use connect/close pair per each db action.
        //           Instead use one connection throughout the application.
        // * * * * *
        if (this.isConnected)
            return Promise.reject(new Error('Mongo client is already connected'));
        try {
            this._mongoClient = await this._mongoClient.connect();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async close() {
        if (!this.isConnected)
            return Promise.reject(new Error('Mongo client is not connected'));
        try {
            await this._mongoClient.close();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    database(name, options = {
        noListener: false,
        returnNonCachedInstance: false, // Control if you want to return a cached instance or have a new one created
    }) {
        if (!tools_1.Validity.isValidString(name))
            throw new Error('invalid database name');
        return this._mongoClient.db(name, options);
    }
}
exports.MongoConnection = MongoConnection;
//# sourceMappingURL=mongoConnection.js.map