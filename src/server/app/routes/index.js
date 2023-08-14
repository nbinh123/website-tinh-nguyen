const UserRoute = require("../routes/user/UserRoute")
const GameRoutes = require("./game/GameRoutes")
const ShopRoutes = require("./shop/ShopRoutes")
// nạp các route vào đây để sử dụng
function route(app) {
    app.use("/api/user", UserRoute)
    app.use("/api/games", GameRoutes)
    app.use("/api/shop", ShopRoutes)
}

module.exports = route