const mongoose = require('mongoose');

const Schema = mongoose.Schema

//tạo bảng phác thảo để lấy api

const ExchangeProduct = new Schema({
    name: String,
    price: Number,
    remaining: {type: Number, default: 0},
    img: String,
})

module.exports = mongoose.model('ExchangeProduct', ExchangeProduct, "exchange-products")

const a = [{
    name: "Gấu bông",
    price: 100,
    remaining: 50,
    img: "",
},{
    name: "Chuông gió",
    price: 150,
    remaining: 100,
    img: "",
},{
    name: "Cây cảnh",
    price: 75,
    remaining: 29,
    img: "",
},{
    name: "Móc khóa",
    price: 25,
    remaining: 10,
    img: "",
},{
    name: "Tranh 1",
    price: 300,
    remaining: 1,
    img: "",
},{
    name: "Tranh 2",
    price: 300,
    remaining: 1,
    img: "",
},{
    name: "Tranh 3",
    price: 300,
    remaining: 1,
    img: "",
},{
    name: "Tranh 4",
    price: 300,
    remaining: 1,
    img: "",
},{
    name: "Tranh 5",
    price: 300,
    remaining: 1,
    img: "",
},]