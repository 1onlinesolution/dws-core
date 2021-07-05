"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const mongodb_1 = require("mongodb");
const product_1 = require("../product/product");
const tools_1 = require("../../tools");
class OrderItem {
    constructor({ _id = new mongodb_1.ObjectId(), product_id = new mongodb_1.ObjectId(), order_id = new mongodb_1.ObjectId(), product = new product_1.Product(), quantity = 0 } = {}) {
        this._id = new mongodb_1.ObjectId();
        this.product_id = new mongodb_1.ObjectId();
        this.order_id = new mongodb_1.ObjectId();
        this.product = new product_1.Product();
        this.quantity = 0;
        this.created_at = tools_1.DateTimeUtils.currentUtcDate();
        this.modified_at = this.created_at;
        this._id = _id;
        this.product_id = product_id;
        this.order_id = order_id;
        this.product = product;
        this.quantity = quantity;
        return this;
    }
}
exports.OrderItem = OrderItem;
//# sourceMappingURL=orderItem.js.map