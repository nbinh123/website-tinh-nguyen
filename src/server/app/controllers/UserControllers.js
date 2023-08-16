const express = require("express") // dùng thư viện express
const app = express()
const UserSchema = require("../model/UserSchema")
const ProductSchema = require("../model/ProductSchema")
const ExchangeProductSchema = require("../model/ExchangeProduct")
const ShippingOrderSchema = require("../model/ShippingOrder")

const clientCurrent = {
    "cart": {
        "payment": false,
        "order": []
    },
    "_id": "64aa4c3301483be3981f592e",
    "name": "Nguyễn Văn Nguyên Bình",
    "sex": "male",
    "email": "nguyenbinm1014@gmail.com",
    "phone": "0905897713",
    "address": "Việt Nam",
    "credit_card": "012123092222",
    "nickname": "",
    "password": "",
    "cart": {
        "payment": {
            "discounted": 0,
            "total": 0,
            "preferential": "NONE"
        },
        "order": []
    },
    "__v": 0
}

class UserController {
    // [GET]        /
    index = async (req, res) => {
        async function o() {
            const a = {
                expiry: 0,
                discount: 10,
                condition: {
                    minTotal: 200000,
                    maxTotal: 500000
                }
            }
            return a
        }
        const data = await UserSchema.findById('64aa4c3301483be3981f592e')
        data.cart.promoteCodes.push({
            expiry: 0,
            discount: 10,
            condition: {
                minTotal: 200000,
                maxTotal: 500000
            }
        })
        await data.save()
            .then(d => res.json(d))

        // Gán giá trị đã giải quyết của promise cho 'promoteCodes'
    }

    // [POST]       /login
    login = async (req, res, next) => {

        const { nickname, password } = req.body
        await UserSchema.find({ nickname: nickname })
            .then(data => {
                if (data[0].password === password) {
                    res.json({
                        data: data,
                        status: 200,
                        message: "Đăng nhập thành công"
                    })
                }
            })
    }
    // [POST]       /register
    register = (req, res, next) => {
        UserSchema.find({})
            .then((list) => {
                // kiểm tra xem tên đăng nhập đã có chưa
                let findNicknameUser = list.filter(user => user.nickname === req.body.nickname)
                // nếu chưa có thì lưu, không thì thôi
                if (findNicknameUser[0] === undefined) {
                    let newUser = new UserSchema(req.body)
                    newUser.save()
                }
            })
            .then(() => console.log("Đăng kí thành công!!"))
            .then(() => res.json({ status: 200 }))
            .catch(next)
    }
    // [GET]        /get
    get_infomation = (req, res, next) => {
        UserSchema.findById(req.query.id)
            .then(user => res.json({
                data: user,
                status: 200
            }))
    }
    // [PUT]        /config/update
    config = async (req, res, next) => {

        const { id, which, boo } = req.body
        // id: string,
        // which: number,
        // boo: number: 0/1
        // 0 là false
        // 1 là true
        let updateKey = ""
        async function returnConfig(which, boolean) {

            switch (which) {
                case 1:
                    updateKey = 'config.onShareLocation'
                    break;
                case 2:
                    updateKey = 'config.onReceiveFromStranger'
                    break;
                case 3:
                    updateKey = 'config.onGetPromoteNofications'
                    break;
                default:
                    break;
            }

            return updateKey
        }

        await returnConfig(Number(which))
            .then(upKey => updateKey = upKey)

        await UserSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    [updateKey]: Boolean(Number(boo))
                }
            }
            , {
                new: true
            }
        )
            .then(data => res.json(data))
    }
    // [PUT]        /info/update
    update_infomations = async (req, res, next) => {
        const { id, nameKey, value } = req.body
        // nameKey là trường cần update
        // value là dữ liệu update
        const infoCurrent = await UserSchema.findById(id)

        // nếu như trong which có trường nào thì sẽ update trường đó
        async function filter() {
            if (value !== infoCurrent[nameKey]) {
                infoCurrent[nameKey] = value
            }
        }
        // chạy hàm update 
        await filter()
        // bắt đầu lưu lại bản ghi và trả về bản ghi mới
        await infoCurrent.save()
            .then((updatedInfomations) => {
                res.json(updatedInfomations)
                console.log("lưu thành công")
            })
    }
    //  [GET]       /cart/get
    get_card = (req, res, next) => {

        const { id } = req.query

        UserSchema.findById(id)
            .then(response => res.json(response))

    }
    //  [PUT]       /cart/update/quanlity
    update_quanlity_order = async (req, res, next) => {

        const updateOrder = async (userId, productId, quanlity) => {
            try {
                const response = await UserSchema.findById(userId, 'name _id cart');
                let order = [...response.cart.order];

                // Lọc qua các sản phẩm của người dùng

                response.cart.order.forEach((product, index) => {
                    // tìm ra id sản phẩm cần chỉnh sửa
                    if (product._id === productId) {
                        // nếu số lượng truyền vào khác số lượng hiện tại thì cập nhập số lượng và lưu lại
                        if (product.quanlity !== Number(quanlity)) {
                            order[index].quanlity = Number(quanlity);
                        }
                    } else {
                        if (index === response.cart.order.length - 1) {
                            UserSchema.findById(userId, 'cart')
                                .then(data => {
                                    order = data.cart.order
                                })
                        }
                    }
                });


                return order;
            } catch (error) {
                console.error(error);
                throw new Error('Lỗi trong quá trình xử lý dữ liệu');
            }
        };

        const updatePayment = async () => {
            return false
        }

        const { id, idP, quanlity } = req.body
        UserSchema.findOneAndUpdate(
            { _id: id }, // Điều kiện để tìm bản ghi cần cập nhật
            {
                $set: {
                    'cart.payment.status': await updatePayment(), // Cập nhật trường payment thành true
                    'cart.order': await updateOrder(id, idP, quanlity) // Cập nhật trường order thành một mảng rỗng
                }
            },
            { new: true } // Lựa chọn để trả về bản ghi sau khi đã cập nhật
        )
            .then(updatedCart => res.json({
                status: 200,
                data: updatedCart
            }))
    }
    //  [PUT]       /cart/update/create
    create_order = async (req, res, next) => {

        const { id, idP, quanlity } = req.body

        const createNewProduct = async (idP, quanlity) => {

            try {

                const data = await ProductSchema.findById({ _id: idP }, 'name price quanlity')
                //"64b11fb4de382565d01dc09e"

                return {
                    _id: idP,
                    name: data.name,
                    price: data.price,
                    quanlity: Number(quanlity)
                }

            } catch (error) {
                console.error(error);
                throw new Error('Lỗi trong quá trình xử lý dữ liệu');
            }
        }
        const ok = false
        UserSchema.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    'cart.order': await createNewProduct(idP, quanlity)
                },
                $set: {
                    'cart.payment.status': false
                }
            }, {
            new: true
        }
        )
            .then(response => res.json({
                status: 200,
                data: response
            }))
    }
    //  [DELETE]    /cart/update/delete
    delete_order = (req, res, next) => {
        // xóa đơn hàng
        const { id, idP } = req.query
        UserSchema.updateOne(
            { _id: id },
            {
                $pull: { 'cart.order': { _id: idP } }
            })
            .then((data) => res.json(data))


    }
    // [PUT]       /cart/pay
    request_bill = async (req, res, next) => {
        const { id, discount } = req.body
        async function handleGetTotal() {
            const response = await UserSchema.findById(id, 'cart')
            let totalCost = 0

            response.cart.order.forEach(product => {
                totalCost += (product.quanlity * product.price)
            })
            return totalCost - (totalCost * Number(discount) / 100)
        }
        UserSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    'cart.paymemt.discounted': Number(discount),
                    'cart.payment.total': await handleGetTotal()
                }
            }, { new: true }
        )
            .then(data => res.json(data))
    }
    recharge_money = async (req, res, next) => {

    }
    //  [POST]      /cart/bill/pay
    pay = async (req, res, next) => {
        // cần có API kết nối với ngân hàng
        // tạo đơn hàng trước rồi thanh toán ngân hàng sau
        const { type, id } = req.body

        await UserSchema.findById(id)
            .then(async (userData) => {
                const newOrder = new ShippingOrderSchema({
                    deliver: "Admin",
                    receiver: id,
                    type: "normal",
                    total: userData.cart.payment.total,
                    order: [...userData.cart.order]
                })
                await newOrder.save()
                    .then((data) => res.status(200).json(data))
            })
    }
    //  [GET]       /coin/get
    get_coin = async (req, res, next) => {
        const { id } = req.query
        await UserSchema.findById(id, 'coin')
            .then(coin => res.json(coin))
    }
    //  [PUT]       /coin/update
    update_coin = async (req, res, next) => {

        // const getCoin = async (id, coin) => {
        //     let response = null
        //     UserSchema.findById(id, 'coin')
        //         .then((data) => console.log(data))
        //     return 200
        // }

        // const { id, coin } = req.body
        // UserSchema.findOneAndUpdate(
        //     { _id: id },
        //     {
        //         $set: {
        //             coin: await getCoin(coin)
        //         }
        //     },{
        //         new: true
        //     }
        // )
        // .then((updated) => res.status(200).json({
        //     status: 200,
        //     data: updated
        // }))
        const { id, coin } = req.body

        UserSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    coin: Number(coin)
                }
            }, {
            new: true
        }
        )
            .then(data => res.json({
                _id: data._id,
                name: data.name,
                coin: data.coin
            }))
    }
    //  [POST]      /coin/buy
    reward_exchange_by_coin = async (req, res, next) => {
        // id là id người mua,
        // idP là id của sản phẩm ưu đãi
        const { id, idP } = req.body

        // tìm ra sản phẩm khuyến mãi

        async function getCoin(price, idProduct, nameProduct) {
            const data = await UserSchema.findById(id, '_id name coin')
            // xử lý thêm order ở đây luôn
            // const newOrder = new ShippingOrderSchema({
            //     deliver: "Admin",
            //     receiver: data._id,
            //     type: "endow",
            //     order: [
            //         {
            //             _id: idProduct,
            //             name: nameProduct
            //         }
            //     ]
            // })
            // await newOrder.save()


            return Number(data.coin - price)
        }
        await ExchangeProductSchema.findById(idP, 'name price remaining')
            .then(async (exchangeProduct) => {

                if (exchangeProduct.remaining > 0) {
                    // giảm coin của user tương ứng với giá của sản phẩm
                    await UserSchema.findOneAndUpdate(
                        { _id: id },
                        {
                            $set: {
                                coin: await getCoin(Number(exchangeProduct.price, exchangeProduct._id, exchangeProduct.name))
                            }
                        }, {
                        new: true
                    }
                    )

                    // update lại số lượng của sản phẩm
                    await ExchangeProductSchema.findOneAndUpdate(
                        { _id: idP },
                        {
                            $set: {
                                remaining: exchangeProduct.remaining - 1
                            }
                        }, {
                        new: true
                    }
                    )
                        .then(newP => res.json(newP))
                }
            })

    }
    //  [POST]      /friend/request
    request_friend = async (req, res, next) => {
        // gửi lời mời kết bạn

        const { myId, theirId } = req.body
        UserSchema.findOneAndUpdate(
            { _id: theirId },
            {
                $push: {
                    waitingAddFriendResponse: myId
                }
            },
            { new: true }
        )
            .then(updated => res.json(updated))
    }
    //  [POST]      /friend/request/cancel
    cancel_request_friend = async (req, res, next) => {
        const { myId, theirId } = req.body
        UserSchema.findOneAndUpdate(
            { _id: theirId },
            {
                $pull: {
                    waitingAddFriendResponse: myId
                }
            },
            { new: true }
        )
            .then(updated => res.json(updated))
    }
    // // [POST]       /friend/request/accept
    accept_request_friend = async (req, res, next) => {
        const { myId, theirId } = req.body
        await UserSchema.findOneAndUpdate(
            { _id: myId },
            {
                $push: {
                    friends: theirId
                }
            }, { new: true }
        )
        const response = await UserSchema.findOneAndUpdate(
            { _id: myId },
            {
                $pull: {
                    waitingAddFriendResponse: theirId
                },
                $push: {
                    friends: theirId
                }
            }, { new: true }
        )
        res.json(response)
    }
    // // [POST]       /friend/request/reject`
    reject_request_friend = async (req, res, next) => {
        const { myId, theirId } = req.body
        UserSchema.findOneAndUpdate(
            { _id: myId },
            {
                $pull: {
                    waitingAddFriendResponse: theirId
                }
            },
            { new: true }
        )
            .then(updated => res.json(updated))
    }
    //  [POST]      /nofication/create
    create_nofication = async (req, res, next) => {

        const { fromId, toId, date, avatar, status, description } = await req.body
        console.log("đã gửi lên server");
        console.log(req.body)

        const response = await UserSchema.findOneAndUpdate(
            { _id: toId },
            {
                $push: {
                    nofications: {
                        from: fromId,
                        date: date,
                        status: Boolean(Number(status)),
                        avatar: avatar,
                        description: description
                    }
                }
            }, {
            new: true
        }
        )
        res.json(response)
    }
    //  [GET]       /nofications/get
    get_nofications = async (req, res, next) => {
        const { id } = req.query
        const userData = await UserSchema.findById(id, 'nofications')
        res.json(userData.nofications)
    }
}

module.exports = new UserController;



