const mongoose = require('mongoose');

const Schema = mongoose.Schema

//tạo bảng phác thảo để lấy api

const Product = new Schema({
    name: String,
    decription: String,
    price: Number,
    quanlity: {type: Number, default: 0},
    sold: Number,
    img: String,
    remaining: {type: Number, default: 0},
    update: {type: Boolean, default: true},
    type: Array
})

module.exports = mongoose.model('Product', Product, "products")