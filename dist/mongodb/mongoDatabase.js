"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
const mongoConnection_1 = require("./mongoConnection");
const tools_1 = require("../tools");
class MongoDatabase {
    constructor(connectionString, name) {
        if (!tools_1.Validity.isValidString(connectionString, 6))
            throw new Error('invalid connection string');
        if (!tools_1.Validity.isValidString(name))
            throw new Error('invalid database name');
        this._connectionString = connectionString;
        this._name = name;
        this._mongoConnection = new mongoConnection_1.MongoConnection(this._connectionString);
        return this;
    }
    get connectionString() {
        return this._connectionString;
    }
    get name() {
        return this._name;
    }
    get isConnected() {
        return this._mongoConnection.isConnected;
    }
    get database() {
        return this._mongoConnection.database(this.name);
    }
    async createCollection(collectionName) {
        await this.ensureCollectionExists(collectionName);
    }
    async ensureCollectionExists(collectionName) {
        if (!(await this.collectionExists(collectionName))) {
            await this.database.createCollection(collectionName);
        }
    }
    async collectionExists(collectionName) {
        const collections = await this.database.listCollections({}, { nameOnly: true }).toArray();
        const collection = collections.find((o) => o.name === collectionName);
        return !!collection;
    }
    static async createDatabase(name, connectionString, connectionOptions = {
        useUnifiedTopology: true,
    }) {
        try {
            const connection = new mongoConnection_1.MongoConnection(connectionString, connectionOptions);
            await connection.connect();
            return new MongoDatabase(connection.connectionString, name);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    // === Error handling ===
    //
    static isMongoError(error) {
        return error.name === 'MongoError';
    }
    errorMessage(error) {
        if (MongoDatabase.isMongoError(error)) {
            const mongoError = error;
            switch (mongoError.code) {
                case 11000:
                    return 'attempt to insert a duplicate record in the database';
                default:
                    return 'database error detected';
            }
        }
        return error.message;
    }
}
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=mongoDatabase.js.map