const mongoose = require('mongoose');

const Schema = mongoose.Schema

//tạo bảng phác thảo để lấy api
const ShippingOrder = new Schema({
    deliver: { type: String, default: "" },
    receiver: { type: String, default: "" },
    intendTime: { type: String, default: ""},
    deadLine: { type: String, default: ""},
    type: { type: String, default: "normal"},
    total: { type: Number, default: 0},
    status: { type: Boolean, default: false },
    order: []
})

module.exports = mongoose.model('ShippingOrder', ShippingOrder, "shipping-orders")