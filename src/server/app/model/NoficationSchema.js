const mongoose = require('mongoose');

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: String,
    cart: { type: Array, default: [] }
})
//tạo bảng phác thảo để lấy api
const Nofications = new Schema({

})

module.exports = mongoose.model('Nofications', Nofications, "nofications")
