"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductCategory = void 0;
const mongodb_1 = require("mongodb");
const tools_1 = require("../../tools");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory[ProductCategory["Generic"] = 0] = "Generic";
    ProductCategory[ProductCategory["Analysis"] = 1] = "Analysis";
    ProductCategory[ProductCategory["Design"] = 2] = "Design";
    ProductCategory[ProductCategory["Management"] = 3] = "Management";
    ProductCategory[ProductCategory["Service"] = 4] = "Service";
})(ProductCategory = exports.ProductCategory || (exports.ProductCategory = {}));
class Product {
    constructor({ _id = new mongodb_1.ObjectId(), name = '', description = '', price = 0.0, features = [], category = ProductCategory.Generic, locked = false, } = {}) {
        this._id = new mongodb_1.ObjectId();
        this.name = '';
        this.description = '';
        this.price = 0.0;
        this.features = [];
        this.category = ProductCategory.Generic;
        this.locked = false;
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.modified_at = this.created_at;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.features = features;
        this.category = category;
        this.locked = locked;
        return this;
    }
    static get indexMap() {
        const createIndexName = (postfix) => `index_product_${postfix}`;
        const map = new Map();
        map
            .set(createIndexName('name'), {
            fieldOrSpec: { name: 1 },
            options: {
                name: createIndexName('name'),
                unique: true,
                background: true,
                // writeConcern: {w: 'majority', wtimeout: 100},
            },
        })
            .set(createIndexName('name_features_label'), {
            fieldOrSpec: { name: 1, 'features.label': 1 },
            options: {
                name: createIndexName('name_features_label'),
                unique: true,
                background: true,
                // writeConcern: {w: 'majority', wtimeout: 100},
            },
        })
            .set(createIndexName('price'), {
            fieldOrSpec: { price: 1 },
            options: {
                name: createIndexName('price'),
                background: true,
                // writeConcern: {w: 'majority', wtimeout: 100},
            },
        })
            .set(createIndexName('category'), {
            fieldOrSpec: { category: 1 },
            options: {
                name: createIndexName('category'),
                background: true,
                // writeConcern: {w: 'majority', wtimeout: 100},
            },
        })
            .set(createIndexName('created_at'), {
            fieldOrSpec: { created_at: 1 },
            options: {
                name: createIndexName('created_at'),
                background: true,
                // writeConcern: {w: 'majority', wtimeout: 100},
            },
        });
        return map;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map