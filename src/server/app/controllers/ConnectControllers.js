const express = require("express") // dùng thư viện express
const app = express()

const ok = {
    id: "64aa4c3301483be3981f592e",
    name: "Nguyễn Văn Nguyên Bình",
    sex: "male",
    email: "nguyenbinm1014@gmail.com",
    phone: "0905897713",
    address: "Việt Nam",
    credit_card: "012123092222",
    nickname: "",
    password: "",
    cart: {
        payment: true,
        order: [
            {
                name: "Thanh Long",
                cost: 1,
                quanlity: 123,
                total: cost * quanlity
            }, {
                name: "Thanh Long",
                cost: 1,
                quanlity: 123,
                total: cost * quanlity
            }, {
                name: "Thanh Long",
                cost: 1,
                quanlity: 123,
                total: cost * quanlity
            }, {
                name: "Thanh Long",
                cost: 1,
                quanlity: 123,
                total: cost * quanlity
            }
        ]
    }
}


class GamesControllers {


}
module.exports = new GamesControllers;