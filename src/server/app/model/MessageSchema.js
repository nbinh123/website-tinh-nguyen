const mongoose = require('mongoose');

const Schema = mongoose.Schema

//tạo bảng phác thảo để lấy api

const DateSchema = new Schema({
    minutes: String,
    hour: String,
    day: String,
    month: String,
    year: String,
    fullTime: String,
})

const Message = new Schema({
    from: String,
    to: String,
    title: String,
    message: String,
    timestamp: DateSchema
})

module.exports = mongoose.model('Message', Message, "messages")