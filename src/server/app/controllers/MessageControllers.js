const express = require("express") // dùng thư viện express
const app = express()
const MessageSchema = require("../model/MessageSchema")

class MessageController {
    // [GET]        /home
    send = (req, res, next) => {
        const newConfession = new MessageSchema(req.body)
        newConfession.save()
            .then(() => res.json({
                data: newConfession,
                status: 200
            }))
            .catch(() => res.json({ status: 404 }))
    }

    get = (req, res, next) => {
        MessageSchema.find({})
            .then(message => res.json(message))
    }

    read = (req, res, next) => {
        MessageSchema.findById(req.params.id)
            .then(info => {
                res.json(info)
                console.log(info)
            })
            .catch(next)
    }

    delete = (req, res, next) => {
        MessageSchema.findByIdAndRemove(req.params.id)
            .then(() => console.log(`Đã xóa confession ${req.params.id}`))
            .then(() => res.json({ status: 200 }))
            .catch(() => res.json({ status: 404 }))
    }
}

module.exports = new MessageController;