const mongoose = require('mongoose');

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: String,
    cart: { type: Array, default: [] }
})
//tạo bảng phác thảo để lấy api
const User = new Schema({
    name: { type: String, default: "Người dùng" },
    img: String,
    sex: { type: String, default: "noneSex" },
    birth: String,
    email: String,
    phone: String,
    administration: { type: Boolean, default: false},
    address: { type: String, default: null },
    credit_card: String,
    nickname: String,
    password: String,
    coin: { type: Number, default: 0 },
    cart: {
        promoteCodes: [
            
        ],
        payment: {
            discounted: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            preferential: { type: String, default: "NONE" },
            status: { type: Boolean, default: false }
        },
        order: []
    },
    config: {
        // kiểm tra đăng nhập
        accessToken: { type: Boolean, default: true },
        // share địa chỉ
        onShareLocation: { type: Boolean, default: false },
        // nhận tin nhắn từ người lạ
        onReceiveFromStranger: { type: Boolean, default: false },
        // nhận thông báo khuyến mãi
        onGetPromoteNofications: { type: Boolean, default: true },
        // phương thức thanh toán
        paymentMethods: {
            flexible: { type: Boolean, default: true },
            banking: {
                isUsed: { type: Boolean, default: false },
                MBB: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
                CTG: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
                BID: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
                ACB: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
                TCP: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
                VPB: {
                    stk: { type: String, default: "" },
                    isUsed: { type: Boolean, default: false }
                },
            }
        }
    },
    friends: {type: Array, defaul: []},
    nofications: {type: Array, default: []},
    waitingAddFriendResponse: {type: Array, default: []}
})

module.exports = mongoose.model('User', User, "user")
