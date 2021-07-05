"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCollection = void 0;
const mongoDatabase_1 = require("./mongoDatabase");
const tools_1 = require("../tools");
const DocumentsPerPage = 25;
class MongoCollection {
    constructor(database, name) {
        this.database = database;
        this.name = name;
        if (!database || !(database instanceof mongoDatabase_1.MongoDatabase) || !tools_1.Validity.isValidString(database.name)) {
            throw new Error('invalid database or database name');
        }
        if (!tools_1.Validity.isValidString(name))
            throw new Error('invalid collection name');
        this.database = database;
        this.name = name;
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get collection() {
        return this.database.database.collection(this.name);
    }
    async ensureCollectionExists() {
        if (!(await this.database.collectionExists(this.name))) {
            await this.database.createCollection(this.name);
        }
    }
    indexExists(indexes) {
        return new Promise((resolve, reject) => {
            this.collection.indexExists(indexes, (err, result) => {
                if (err) {
                    // For any error detected
                    reject(err);
                }
                else {
                    // When task is finished
                    resolve(result);
                }
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createIndex(fieldOrSpec, options) {
        return new Promise((resolve, reject) => {
            this.collection.createIndex(fieldOrSpec, options, (err, result) => {
                if (err) {
                    // For any error detected
                    reject(err);
                }
                else {
                    // When task is finished
                    resolve(result);
                }
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createIndexes(indexMap) {
        if (!indexMap || indexMap.size === 0)
            return Promise.reject('Invalid collection index map');
        try {
            await this.ensureCollectionExists();
            const promises = []; // eslint-disable-line @typescript-eslint/no-explicit-any
            indexMap.forEach((value, key) => {
                this.indexExists(key).then((exist) => {
                    if (typeof exist === 'boolean' && !exist) {
                        const promise = this.createIndex(value.fieldOrSpec, value.options);
                        promises.push(promise);
                    }
                });
            });
            // Wait for all Promises to complete
            Promise.all(promises)
                .then((results) => {
                // Handle results
                return Promise.resolve(results);
            })
                .catch((err) => {
                return Promise.reject(err);
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    // ===================================================================
    // insertOne operations
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    async insertOne(document, options = {}) {
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~insertOneWriteOpResult
        await this.checkDocument(document);
        const operationResult = await this.collection.insertOne(document, options);
        const { result, insertedId, insertedCount } = operationResult;
        const success = result.ok === 1 && insertedCount === 1;
        return success ? insertedId : null;
    }
    async insertOneWithWriteConcern(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    document, options = {
        w: 'majority',
        wtimeout: 100,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) {
        return await this.insertOne(document, options);
    }
    // ===================================================================
    // deleteOne operations
    async deleteOne(filter, options) {
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~deleteWriteOpCallback
        await this.checkFilter(filter);
        const operationResult = await this.collection.deleteOne(filter, options);
        const { result } = operationResult;
        return Promise.resolve(result.ok === 1 && result.n === 1);
    }
    async deleteOneWithWriteConcern(filter, options) {
        await this.checkFilter(filter);
        return await this.deleteOne(filter, options);
    }
    // ===================================================================
    // findOne operations
    async findOne(filter = {}, options) {
        await this.checkFilter(filter);
        return await this.collection.findOne(filter, options);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async findDocumentById(id) {
        // id could be string !!!
        if (!id)
            return Promise.reject(new Error('invalid document id'));
        return await this.findOne({ _id: id });
    }
    // ===================================================================
    // updateOne operations
    async updateOne(filter, update, options = { upsert: false }) {
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~updateWriteOpCallback
        await this.checkFilter(filter);
        const updateWriteOpResult = await this.collection.updateOne(filter, update, options);
        const { result, matchedCount, modifiedCount } = updateWriteOpResult;
        return result.ok === 1 && result.n === 1 && result.nModified === 1 && matchedCount === 1 && modifiedCount === 1;
    }
    async updateOneWithWriteConcern(filter, update, options = {
        upsert: false,
        writeConcern: {
            w: 'majority',
            wtimeout: 100,
        },
    }) {
        return await this.updateOne(filter, update, options);
    }
    // ===================================================================
    // count operations
    async count(filter = {}, options = {}) {
        // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#countDocuments
        // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~countCallback
        await this.checkFilter(filter);
        try {
            // Returns the count of documents or error
            return await this.collection.countDocuments(filter, options);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    // ===================================================================
    // find operations
    async find(filter = {}, options = {}) {
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
        await this.checkFilter(filter);
        return await this.collection.find(filter, options).toArray();
    }
    async findAndSort(filter = {}, options = {}, keyOrList = {}, direction) {
        // https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
        await this.checkFilter(filter);
        return await this.collection.find(filter, options).sort(keyOrList, direction).toArray();
    }
    async findPage(filter = {}, documentsPerPage = DocumentsPerPage, page = 1) {
        await this.checkFilter(filter);
        const numItemsToSkip = (page - 1) * documentsPerPage;
        const newOptions = {
            limit: documentsPerPage,
            skip: numItemsToSkip,
        };
        return await this.find(filter, newOptions);
    }
    // ===================================================================
    // aggregate operations
    aggregate(
    // eslint-disable-next-line @typescript-eslint/ban-types
    pipeline, options, callback) {
        return this.collection.aggregate(pipeline, options, callback);
    }
    // ===================================================================
    // checks
    checkFilter(filter) {
        return filter ? Promise.resolve(true) : MongoCollection.badRequestErrorAsPromise('filter');
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    checkDocument(document) {
        return document ? Promise.resolve(true) : MongoCollection.badRequestErrorAsPromise('document');
    }
    static badRequestErrorAsPromise(label) {
        const message = `Bad request: ${label}`;
        return Promise.reject(new Error(message));
    }
}
exports.MongoCollection = MongoCollection;
//# sourceMappingURL=mongoCollection.js.map